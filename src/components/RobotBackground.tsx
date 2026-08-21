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
      if (cancelled || !container) return;

      // 1. Scene & Camera Setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
      camera.position.set(0, 1.15, 3.4);
      camera.lookAt(0, 0.85, 0);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      container.appendChild(renderer.domElement);

      // 2. High-Tech Studio Lighting
      const hemi = new THREE.HemisphereLight(0xffffff, 0x1a2233, 1.2);
      
      const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
      keyLight.position.set(3, 5, 4);

      const fillLight = new THREE.DirectionalLight(0x88bbff, 1.0);
      fillLight.position.set(-4, 3, 2);

      const cyberRimLeft = new THREE.DirectionalLight(0x76b900, 2.2);
      cyberRimLeft.position.set(-3.5, 2.5, -3);

      const cyberRimRight = new THREE.DirectionalLight(0x00e5ff, 1.8);
      cyberRimRight.position.set(3.5, 2.5, -3);

      const topAccent = new THREE.PointLight(0xffffff, 1.5, 10);
      topAccent.position.set(0, 4, 1);

      scene.add(hemi, keyLight, fillLight, cyberRimLeft, cyberRimRight, topAccent);

      // 3. Grid & Environment Rings
      const grid = new THREE.GridHelper(12, 36, 0x76b900, 0x445566);
      const gridMat = grid.material as InstanceType<typeof THREE.LineBasicMaterial>;
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
        const texture = new THREE.CanvasTexture(canvas);
        return texture;
      }
      const shadowTexture = createShadowTexture();
      const shadowGeo = new THREE.PlaneGeometry(1.2, 1.2);
      shadowGeo.rotateX(-Math.PI / 2);

      // 5. Realistic PBR Materials
      const bodyMatDark = new THREE.MeshStandardMaterial({
        color: 0x242830,
        metalness: 0.75,
        roughness: 0.28,
        envMapIntensity: 1.2,
      });

      const bodyMatLight = new THREE.MeshStandardMaterial({
        color: 0xdde2eb,
        metalness: 0.65,
        roughness: 0.25,
        envMapIntensity: 1.1,
      });

      const chassisJointMat = new THREE.MeshStandardMaterial({
        color: 0x141619,
        metalness: 0.6,
        roughness: 0.45,
      });

      const sensorGlowMat = new THREE.MeshStandardMaterial({
        color: 0x76b900,
        metalness: 0.4,
        roughness: 0.2,
        emissive: 0x76b900,
        emissiveIntensity: 2.4,
      });

      const sensorCyanGlowMat = new THREE.MeshStandardMaterial({
        color: 0x00e5ff,
        metalness: 0.4,
        roughness: 0.2,
        emissive: 0x00e5ff,
        emissiveIntensity: 2.4,
      });

      const draco = new DRACOLoader().setDecoderPath("/draco/");
      const loader = new GLTFLoader().setDRACOLoader(draco);
      const gltf = await loader.loadAsync("/robot/g1.glb").catch(() => null);
      if (cancelled || !gltf) return;

      // Base robot setup
      const baseInner = gltf.scene;
      baseInner.rotation.set(-Math.PI / 2, 0, 0);

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
        const shadowMat = new THREE.MeshBasicMaterial({
          map: shadowTexture,
          transparent: true,
          opacity: 0.6,
          depthWrite: false,
        });
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
            if (/head|logo|d435|d455|mid360/.test(name)) {
              mesh.material = r.id === "left" ? sensorCyanGlowMat : sensorGlowMat;
            } else if (/hand|foot|ankle|joint|motor/.test(name)) {
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
      const resizeObserver = new ResizeObserver(placeModel);
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
      let rafId = 0;
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
        hemi.intensity = dark ? 0.8 : 1.2;
        keyLight.intensity = dark ? 2.2 : 3.0;
        gridMat.opacity = dark ? 0.22 : 0.14;

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

      cleanup = () => {
        cancelAnimationFrame(rafId);
        resizeObserver.disconnect();
        draco.dispose();
        shadowTexture?.dispose();
        shadowGeo.dispose();
        bodyMatDark.dispose();
        bodyMatLight.dispose();
        chassisJointMat.dispose();
        sensorGlowMat.dispose();
        sensorCyanGlowMat.dispose();
        for (const r of robots) {
          r.inner.traverse((obj: any) => {
            const mesh = obj as InstanceType<typeof THREE.Mesh>;
            if (mesh.isMesh) mesh.geometry.dispose();
          });
        }
        renderer.dispose();
        renderer.domElement.remove();
      };
    }

    init().catch(() => {});
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
        opacity: enabled ? 0.75 : 0,
        transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className="pointer-events-none fixed inset-0 z-0 [&>canvas]:h-full [&>canvas]:w-full"
    />
  );
}
