import { useEffect, useRef } from "react";
import { useTheme } from "../hooks/useTheme";
import { useRobot, type RobotFormation } from "../context/RobotContext";
import { jointsByName } from "../data/robotJoints";
import { DANCE_MOVES, MOVE_CYCLE_ORDER, type BuiltinMoveName } from "../data/robotMoves";

const CYCLE_DURATION = 12; // Seconds per move in auto mode

type RobotInstance = {
  id: string;
  root: any; // THREE.Group
  inner: any; // THREE.Group
  shadow: any; // THREE.Mesh
  joints: Map<
    string,
    {
      node: any;
      base: any;
      axis: any;
    }
  >;
  current: Map<string, number>;
  baseY: number;
  bob: number;
  targetPos: { x: number; y: number; z: number; scale: number; rotY: number; opacity: number };
  currentPos: { x: number; y: number; z: number; scale: number; rotY: number; opacity: number };
  phaseOffset: number;
};

export function RobotBackground() {
  const { theme } = useTheme();
  const { enabled, formation, move, speed } = useRobot();
  const containerRef = useRef<HTMLDivElement>(null);

  // References for live animation loop
  const stateRef = useRef({
    theme,
    enabled,
    formation,
    move,
    speed,
    mouseX: 0,
    mouseY: 0,
  });

  useEffect(() => {
    stateRef.current.theme = theme;
    stateRef.current.enabled = enabled;
    stateRef.current.formation = formation;
    stateRef.current.move = move;
    stateRef.current.speed = speed;
  }, [theme, enabled, formation, move, speed]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      stateRef.current.mouseX = x;
      stateRef.current.mouseY = y;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    async function init() {
      const THREE = await import("three");
      const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
      const { DRACOLoader } = await import("three/examples/jsm/loaders/DRACOLoader.js");
      const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js");
      if (cancelled || !container) return;

      // 1. Scene & Camera Setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
      camera.position.set(0, 1.15, 3.4);
      camera.lookAt(0, 0.85, 0);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      const resources = new Set<{ dispose(): void }>();
      let disposed = false;
      let rafId = 0;
      let resizeObserver: ResizeObserver | undefined;
      function track<T extends { dispose(): void }>(resource: T): T {
        if (!resources.has(resource)) {
          resources.add(resource);
          // A model can finish loading after this effect has already unmounted.
          if (disposed) resource.dispose();
        }
        return resource;
      }
      cleanup = () => {
        if (disposed) return;
        disposed = true;
        cancelAnimationFrame(rafId);
        resizeObserver?.disconnect();
        for (const resource of resources) resource.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.0;
      container.appendChild(renderer.domElement);

      // A studio environment gives the metal real reflections instead of black surfaces.
      const studio = new RoomEnvironment();
      const pmrem = new THREE.PMREMGenerator(renderer);
      try {
        const environment = track(pmrem.fromScene(studio, 0.04));
        scene.environment = environment.texture;
      } finally {
        studio.dispose();
        pmrem.dispose();
      }

      // Soft key/fill lighting, with restrained colored edges.
      const hemi = new THREE.HemisphereLight(0xf0f5ff, 0x586170, 1.5);
      
      const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
      keyLight.position.set(3, 5, 4);

      const fillLight = new THREE.DirectionalLight(0xcbdfff, 1.4);
      fillLight.position.set(-4, 3, 2);

      const cyberRimLeft = new THREE.DirectionalLight(0xb4d88c, 0.65);
      cyberRimLeft.position.set(-3.5, 2.5, -3);

      const cyberRimRight = new THREE.DirectionalLight(0x99d9ed, 0.8);
      cyberRimRight.position.set(3.5, 2.5, -3);

      const topAccent = new THREE.PointLight(0xffffff, 1.5, 10);
      topAccent.position.set(0, 4, 1);

      scene.add(hemi, keyLight, fillLight, cyberRimLeft, cyberRimRight, topAccent);

      // 3. Grid & Environment Rings
      const grid = new THREE.GridHelper(12, 36, 0x76b900, 0x445566);
      const gridMat = grid.material as InstanceType<typeof THREE.LineBasicMaterial>;
      track(grid.geometry);
      track(gridMat);
      gridMat.transparent = true;
      gridMat.opacity = 0.22;
      scene.add(grid);

      // 4. Soft Contact Shadow Canvas Texture Generator
      function createShadowTexture() {
        const canvas = document.createElement("canvas");
        canvas.width = 128;
        canvas.height = 128;
        const ctx = canvas.getContext("2d");
        if (!ctx) return null;
        const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
        gradient.addColorStop(0, "rgba(0,0,0,0.75)");
        gradient.addColorStop(0.3, "rgba(0,0,0,0.45)");
        gradient.addColorStop(0.7, "rgba(0,0,0,0.12)");
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 128, 128);
        const texture = track(new THREE.CanvasTexture(canvas));
        return texture;
      }
      const shadowTexture = createShadowTexture();
      const shadowGeo = track(new THREE.PlaneGeometry(1.2, 1.2));
      shadowGeo.rotateX(-Math.PI / 2);

      // 5. Realistic PBR Materials
      const bodyMatDark = track(new THREE.MeshStandardMaterial({
        color: 0x8995a5,
        metalness: 0.45,
        roughness: 0.36,
        envMapIntensity: 0.85,
      }));

      const bodyMatLight = track(new THREE.MeshStandardMaterial({
        color: 0x3c4b60,
        metalness: 0.35,
        roughness: 0.38,
        envMapIntensity: 0.55,
      }));

      const chassisJointMat = track(new THREE.MeshStandardMaterial({
        color: 0x202832,
        metalness: 0.25,
        roughness: 0.52,
      }));

      const visorMat = track(new THREE.MeshPhysicalMaterial({
        color: 0x101822,
        metalness: 0.3,
        roughness: 0.22,
        clearcoat: 1,
        clearcoatRoughness: 0.16,
        envMapIntensity: 0.9,
        side: THREE.DoubleSide,
      }));
      const logoMat = track(new THREE.MeshStandardMaterial({
        color: 0xc2ccd7,
        metalness: 0.25,
        roughness: 0.45,
      }));

      const sensorGlowMat = track(new THREE.MeshStandardMaterial({
        color: 0x76b900,
        metalness: 0.4,
        roughness: 0.2,
        emissive: 0x76b900,
        emissiveIntensity: 0.4,
      }));

      const sensorCyanGlowMat = track(new THREE.MeshStandardMaterial({
        color: 0x00e5ff,
        metalness: 0.4,
        roughness: 0.2,
        emissive: 0x00e5ff,
        emissiveIntensity: 0.4,
      }));

      const draco = track(new DRACOLoader().setDecoderPath("/draco/"));
      const loader = new GLTFLoader().setDRACOLoader(draco);
      const gltf = await loader.loadAsync("/robot/g1.glb");
      // Capture original resources before clone materials are replaced. The set
      // also prevents shared geometries and materials from being disposed twice.
      for (const modelScene of gltf.scenes) {
        modelScene.traverse((obj) => {
          const mesh = obj as InstanceType<typeof THREE.Mesh>;
          if (!mesh.isMesh) return;
          track(mesh.geometry);
          const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          for (const material of materials) {
            track(material);
            for (const value of Object.values(material)) {
              if (value instanceof THREE.Texture) track(value);
            }
          }
        });
      }
      if (cancelled) return;

      // Base robot setup
      const baseInner = gltf.scene;
      baseInner.rotation.set(-Math.PI / 2, 0, 0);

      // The exported shell has an open sensor cavity. Fill it with recessed glass
      // in the head's local URDF frame (X forward, Z up), before cloning the rig.
      const head = baseInner.getObjectByName("head_link");
      if (head) {
        const visor = new THREE.Mesh(track(new THREE.SphereGeometry(1, 32, 24)), visorMat);
        visor.name = "head_visor_insert";
        visor.position.set(-0.002, 0, 0.446);
        visor.scale.set(0.035, 0.046, 0.061);
        head.add(visor);

        const sensor = new THREE.Mesh(track(new THREE.SphereGeometry(0.0035, 12, 8)), sensorGlowMat);
        sensor.name = "sensor_accent";
        sensor.position.set(0.034, -0.015, 0.447);
        head.add(sensor);
      }

      // Compute base height
      const tempGroup = new THREE.Group();
      tempGroup.add(baseInner.clone(true));
      tempGroup.rotation.y = -Math.PI / 2;
      tempGroup.updateMatrixWorld(true);
      const calculatedBaseY = -new THREE.Box3().setFromObject(tempGroup).min.y;

      // 6. Build Multi-Robot Pool (3 robots for Solo / Duet / Trio)
      const robots: RobotInstance[] = [];
      const robotConfigs = [
        { id: "lead", accentMat: sensorGlowMat, phaseOffset: 0 },
        { id: "left", accentMat: sensorCyanGlowMat, phaseOffset: 0.8 },
        { id: "right", accentMat: sensorGlowMat, phaseOffset: 1.6 },
      ];

      for (let i = 0; i < 3; i++) {
        const conf = robotConfigs[i];
        const inner = baseInner.clone(true);
        const root = new THREE.Group();
        root.add(inner);
        root.rotation.y = -Math.PI / 2;
        root.position.y = calculatedBaseY;
        scene.add(root);

        // Ground Contact Shadow
        const shadowMat = track(new THREE.MeshBasicMaterial({
          map: shadowTexture,
          transparent: true,
          opacity: 0.6,
          depthWrite: false,
        }));
        const shadow = new THREE.Mesh(shadowGeo, shadowMat);
        shadow.position.y = 0.005;
        scene.add(shadow);

        // Bind Joints
        const joints = new Map<string, { node: any; base: any; axis: any }>();
        for (const [name, meta] of jointsByName) {
          if (meta.upper <= meta.lower) continue;
          const node = inner.getObjectByName(meta.node);
          if (!node) continue;
          joints.set(name, {
            node,
            base: node.quaternion.clone(),
            axis: new THREE.Vector3(...meta.axis).normalize(),
          });
        }

        robots.push({
          id: conf.id,
          root,
          inner,
          shadow,
          joints,
          current: new Map<string, number>(),
          baseY: calculatedBaseY,
          bob: 0,
          targetPos: { x: 0, y: calculatedBaseY, z: 0, scale: 1, rotY: -Math.PI / 2, opacity: 1 },
          currentPos: { x: 0, y: calculatedBaseY, z: 0, scale: 1, rotY: -Math.PI / 2, opacity: 1 },
          phaseOffset: conf.phaseOffset,
        });
      }

      function updateMaterials(isDark: boolean) {
        const bodyMat = isDark ? bodyMatDark : bodyMatLight;
        for (const r of robots) {
          r.inner.traverse((obj: any) => {
            const mesh = obj as InstanceType<typeof THREE.Mesh>;
            if (!mesh.isMesh) return;
            if (!mesh.geometry.getAttribute("normal")) mesh.geometry.computeVertexNormals();
            const name = mesh.name.toLowerCase();
            if (/sensor_accent/.test(name)) {
              mesh.material = r.id === "left" ? sensorCyanGlowMat : sensorGlowMat;
            } else if (/head|visor|d435|d455|mid360/.test(name)) {
              mesh.material = visorMat;
            } else if (/logo/.test(name)) {
              mesh.material = logoMat;
            } else if (/hand|foot|ankle|joint|motor|wrist|thumb|index|middle|ring|pinky|waist|shoulder_roll|shoulder_yaw/.test(name)) {
              mesh.material = chassisJointMat;
            } else {
              mesh.material = bodyMat;
            }
          });
        }
      }
      updateMaterials(stateRef.current.theme === "dark");

      // 7. Responsive Placement & Formations
      let centerShiftX = 0;
      function placeModel() {
        const { clientWidth: w, clientHeight: h } = container!;
        if (!w || !h) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        // Push center toward the right on desktop, center on narrow screens
        centerShiftX = Math.min(1.05, Math.max(0, (camera.aspect - 1.1) * 0.85));
      }
      placeModel();
      resizeObserver = new ResizeObserver(placeModel);
      resizeObserver.observe(container);

      // Formation Targets
      function updateFormationTargets(formation: RobotFormation) {
        const lead = robots[0];
        const left = robots[1];
        const right = robots[2];

        if (formation === "solo") {
          lead.targetPos = { x: centerShiftX, y: calculatedBaseY, z: 0, scale: 1.0, rotY: -Math.PI / 2, opacity: 1 };
          left.targetPos = { x: centerShiftX - 2.5, y: calculatedBaseY, z: -1, scale: 0.01, rotY: -Math.PI / 2, opacity: 0 };
          right.targetPos = { x: centerShiftX + 2.5, y: calculatedBaseY, z: -1, scale: 0.01, rotY: -Math.PI / 2, opacity: 0 };
        } else if (formation === "duet") {
          lead.targetPos = { x: centerShiftX + 0.7, y: calculatedBaseY, z: 0.1, scale: 0.98, rotY: -Math.PI / 2 - 0.15, opacity: 1 };
          left.targetPos = { x: centerShiftX - 0.7, y: calculatedBaseY, z: -0.2, scale: 0.94, rotY: -Math.PI / 2 + 0.2, opacity: 1 };
          right.targetPos = { x: centerShiftX + 2.5, y: calculatedBaseY, z: -1, scale: 0.01, rotY: -Math.PI / 2, opacity: 0 };
        } else {
          // Trio Crew
          lead.targetPos = { x: centerShiftX, y: calculatedBaseY, z: 0.25, scale: 1.02, rotY: -Math.PI / 2, opacity: 1 };
          left.targetPos = { x: centerShiftX - 1.15, y: calculatedBaseY, z: -0.45, scale: 0.9, rotY: -Math.PI / 2 + 0.22, opacity: 1 };
          right.targetPos = { x: centerShiftX + 1.15, y: calculatedBaseY, z: -0.45, scale: 0.9, rotY: -Math.PI / 2 - 0.22, opacity: 1 };
        }
      }

      // 8. Animation & Choreography Loop
      const q = new THREE.Quaternion();
      const clock = new THREE.Clock();
      let lastTheme = stateRef.current.theme;
      let currentCamX = 0;
      let currentCamY = 1.15;

      function frame() {
        const { enabled, formation, move, speed, theme, mouseX, mouseY } = stateRef.current;

        if (theme !== lastTheme) {
          updateMaterials(theme === "dark");
          lastTheme = theme;
        }

        const dark = theme === "dark";
        hemi.intensity = dark ? 1.5 : 0.85;
        keyLight.intensity = dark ? 2.0 : 1.25;
        fillLight.intensity = dark ? 1.4 : 0.8;
        renderer.toneMappingExposure = dark ? 1.0 : 0.85;
        gridMat.opacity = dark ? 0.12 : 0.07;

        if (!enabled) {
          // Hide all robots smoothly
          for (const r of robots) {
            r.root.visible = false;
            r.shadow.visible = false;
          }
          renderer.render(scene, camera);
          rafId = requestAnimationFrame(frame);
          return;
        }

        const dt = Math.min(clock.getDelta(), 0.08);
        const t = clock.elapsedTime * (speed || 1);

        // Determine current move definition
        let activeMoveName: BuiltinMoveName;
        if (move === "auto" || !DANCE_MOVES[move as BuiltinMoveName]) {
          const moveIdx = Math.floor(t / CYCLE_DURATION) % MOVE_CYCLE_ORDER.length;
          activeMoveName = MOVE_CYCLE_ORDER[moveIdx];
        } else {
          activeMoveName = move as BuiltinMoveName;
        }
        const moveDef = DANCE_MOVES[activeMoveName] || DANCE_MOVES.groove;

        // Smooth Camera Parallax from Mouse
        const targetCamX = mouseX * 0.35;
        const targetCamY = 1.15 + mouseY * 0.18;
        currentCamX += (targetCamX - currentCamX) * dt * 3.5;
        currentCamY += (targetCamY - currentCamY) * dt * 3.5;
        camera.position.x = currentCamX;
        camera.position.y = currentCamY;
        // Fit the full dancing formation on narrow screens, including arm reach.
        const formationSpan = formation === "solo" ? 1.5 : formation === "duet" ? 3.0 : 3.8;
        const horizontalFov = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.aspect;
        camera.position.z = Math.max(3.4, (formationSpan + 2 * centerShiftX) / horizontalFov + 0.25);
        camera.lookAt(currentCamX * 0.5, 0.85, 0);

        updateFormationTargets(formation);

        // Animate each robot in the formation
        const ease = Math.min(1, dt * 11);
        const posEase = Math.min(1, dt * 4.5);

        for (let i = 0; i < robots.length; i++) {
          const r = robots[i];

          // Positional lerping for formation switches
          r.currentPos.x += (r.targetPos.x - r.currentPos.x) * posEase;
          r.currentPos.y += (r.targetPos.y - r.currentPos.y) * posEase;
          r.currentPos.z += (r.targetPos.z - r.currentPos.z) * posEase;
          r.currentPos.scale += (r.targetPos.scale - r.currentPos.scale) * posEase;
          r.currentPos.rotY += (r.targetPos.rotY - r.currentPos.rotY) * posEase;
          r.currentPos.opacity += (r.targetPos.opacity - r.currentPos.opacity) * posEase;

          const isVisible = r.currentPos.opacity > 0.01 && r.currentPos.scale > 0.05;
          r.root.visible = isVisible;
          r.shadow.visible = isVisible;

          if (!isVisible) continue;

          r.root.scale.setScalar(r.currentPos.scale);
          r.shadow.scale.setScalar(r.currentPos.scale * (1 + (r.bob < 0 ? -r.bob * 2 : 0)));
          (r.shadow.material as InstanceType<typeof THREE.MeshBasicMaterial>).opacity =
            r.currentPos.opacity * (dark ? 0.7 : 0.45);

          // Calculate joint target angles with phase offset
          const robotT = t + r.phaseOffset;
          const targets = new Map<string, number>();

          for (const e of moveDef.joints) {
            const meta = jointsByName.get(e.joint);
            if (!meta) continue;
            let s = Math.sin(2 * Math.PI * e.freq * robotT + (e.phase ?? 0));
            if (e.steps) s = Math.round(s * e.steps) / e.steps;
            const angle = (e.offset ?? 0) + e.amp * s;
            targets.set(e.joint, Math.min(meta.upper * 0.95, Math.max(meta.lower * 0.95, angle)));
          }

          // Apply quaternions to revolute joint nodes
          for (const [name, rt] of r.joints) {
            const target = targets.get(name) ?? 0;
            const prev = r.current.get(name) ?? 0;
            const next = prev + (target - prev) * ease;
            r.current.set(name, next);
            q.setFromAxisAngle(rt.axis, next);
            rt.node.quaternion.copy(rt.base).multiply(q);
          }

          // Vertical Bounce / Bob synced to tempo
          const bobAmp = moveDef.bobAmp ?? 0.04;
          const bobFreq = moveDef.bobFreq ?? 2;
          const bobTarget = -bobAmp * (0.5 + 0.5 * Math.sin(2 * Math.PI * bobFreq * robotT));
          r.bob += (bobTarget - r.bob) * ease;

          r.root.position.set(r.currentPos.x, r.currentPos.y + r.bob, r.currentPos.z);
          r.shadow.position.set(r.currentPos.x, 0.005, r.currentPos.z);

          // Subtle turntable sway
          const yawAmp = moveDef.bodyYawAmp ?? 0.3;
          const yawFreq = moveDef.bodyYawFreq ?? 0.2;
          const dynamicYaw = yawAmp * Math.sin(robotT * yawFreq * Math.PI);
          r.root.rotation.y = r.currentPos.rotY + dynamicYaw;
        }

        renderer.render(scene, camera);
        rafId = requestAnimationFrame(frame);
      }
      rafId = requestAnimationFrame(frame);
    }

    init().catch(() => cleanup?.());
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      style={{
        opacity: enabled ? (theme === "dark" ? 0.62 : 0.55) : 0,
        transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className="pointer-events-none fixed inset-0 z-0 [&>canvas]:h-full [&>canvas]:w-full"
    />
  );
}
