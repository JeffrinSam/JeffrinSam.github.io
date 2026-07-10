import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { useTheme } from "../hooks/useTheme";

type Limb = {
  shoulder?: THREE.Group;
  elbow?: THREE.Group;
  hip?: THREE.Group;
  knee?: THREE.Group;
};

function buildRobot() {
  const root = new THREE.Group();

  const shell = new THREE.MeshStandardMaterial({ color: 0xf2f2f2, roughness: 0.45, metalness: 0.15 });
  const joint = new THREE.MeshStandardMaterial({ color: 0x1a1a1e, roughness: 0.5, metalness: 0.3 });
  const visor = new THREE.MeshStandardMaterial({ color: 0x111114, roughness: 0.2, metalness: 0.6 });

  // Hip height above ground: thigh (0.32) + shin (0.32) + foot (0.06) = 0.70
  const pelvis = new THREE.Group();
  pelvis.position.y = 0.72;
  root.add(pelvis);

  const hips = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.2, 0.32), joint);
  hips.position.y = 0;
  pelvis.add(hips);

  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.6, 0.34), shell);
  torso.position.y = 0.4; // hips top (0.1) + half torso height (0.3)
  pelvis.add(torso);

  const neck = new THREE.Group();
  neck.position.y = 0.7; // top of torso
  pelvis.add(neck);

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.24, 0.26), shell);
  head.position.y = 0.15;
  neck.add(head);
  const face = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.08, 0.02), visor);
  face.position.set(0, 0.15, 0.14);
  neck.add(face);

  const limbs: Record<"leftArm" | "rightArm" | "leftLeg" | "rightLeg", Limb> = {
    leftArm: {},
    rightArm: {},
    leftLeg: {},
    rightLeg: {},
  };

  const buildArm = (side: 1 | -1) => {
    const shoulder = new THREE.Group();
    shoulder.position.set(0.34 * side, 0.62, 0);
    pelvis.add(shoulder);

    const upper = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.055, 0.28, 12), joint);
    upper.position.y = -0.14;
    shoulder.add(upper);

    const elbow = new THREE.Group();
    elbow.position.y = -0.28;
    shoulder.add(elbow);

    const forearm = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.045, 0.26, 12), shell);
    forearm.position.y = -0.13;
    elbow.add(forearm);

    return { shoulder, elbow };
  };

  const buildLeg = (side: 1 | -1) => {
    const hip = new THREE.Group();
    hip.position.set(0.14 * side, -0.1, 0);
    pelvis.add(hip);

    const thigh = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.07, 0.32, 12), shell);
    thigh.position.y = -0.16;
    hip.add(thigh);

    const knee = new THREE.Group();
    knee.position.y = -0.32;
    hip.add(knee);

    const shin = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.055, 0.32, 12), joint);
    shin.position.y = -0.16;
    knee.add(shin);

    const foot = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.06, 0.2), joint);
    foot.position.set(0, -0.35, 0.04);
    knee.add(foot);

    return { hip, knee };
  };

  limbs.leftArm = buildArm(1);
  limbs.rightArm = buildArm(-1);
  limbs.leftLeg = buildLeg(1);
  limbs.rightLeg = buildLeg(-1);

  return { root, pelvis, neck, limbs };
}

export function RobotScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
    camera.position.set(1.9, 1.55, 3.1);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, theme === "dark" ? 0.9 : 1.1);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(0xffffff, theme === "dark" ? 1.6 : 1.3);
    key.position.set(3, 4, 2);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x76b900, 0.5);
    rim.position.set(-3, 2, -2);
    scene.add(rim);

    const { root, pelvis, neck, limbs } = buildRobot();
    scene.add(root);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1.0, 0);
    controls.enablePan = false;
    controls.minDistance = 2.2;
    controls.maxDistance = 5;
    controls.maxPolarAngle = Math.PI * 0.62;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.update();

    const resize = () => {
      const { clientWidth, clientHeight } = container;
      if (!clientWidth || !clientHeight) return;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    let raf = 0;
    const clock = new THREE.Clock();

    const tick = () => {
      const t = clock.getElapsedTime();
      if (!reduceMotion) {
        const beat = t * 2.2;
        root.position.y = Math.abs(Math.sin(beat)) * 0.05;
        pelvis.rotation.z = Math.sin(beat) * 0.06;
        pelvis.rotation.y = Math.sin(beat * 0.5) * 0.15;
        neck.rotation.z = Math.sin(beat * 0.5 + 0.4) * 0.08;

        limbs.leftArm.shoulder!.rotation.z = 0.3 + Math.sin(beat + Math.PI) * 0.7;
        limbs.rightArm.shoulder!.rotation.z = -0.3 - Math.sin(beat) * 0.7;
        limbs.leftArm.elbow!.rotation.x = 0.3 + Math.max(0, Math.sin(beat + Math.PI)) * 0.6;
        limbs.rightArm.elbow!.rotation.x = 0.3 + Math.max(0, Math.sin(beat)) * 0.6;

        limbs.leftLeg.hip!.rotation.x = Math.sin(beat) * 0.12;
        limbs.rightLeg.hip!.rotation.x = Math.sin(beat + Math.PI) * 0.12;
      }
      controls.update();
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      controls.dispose();
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
      container.removeChild(renderer.domElement);
    };
  }, [theme]);

  return <div ref={containerRef} className="h-full w-full" />;
}
