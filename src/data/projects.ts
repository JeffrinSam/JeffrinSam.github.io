export type MediaItem = { label: string; kind: "video" | "youtube" | "gif"; src: string };

export type Project = {
  title: string;
  period: string;
  description: string;
  tags: string[];
  href: string;
  linkLabel: string;
  media?: MediaItem[];
};

const G1_RAW = "https://raw.githubusercontent.com/JeffrinSam/JeffrinSam_G1/main";
const VTOL_RAW = "https://raw.githubusercontent.com/JeffrinSam/VTOL-Tailsitter-Unity-SIL/main/Media";
const RRT_RAW = "https://raw.githubusercontent.com/thexuanphuc/path-planning-project/master/media/unity";
const MPC_RAW = "https://raw.githubusercontent.com/thexuanphuc/drone_mpc/present/src/media";

export const projects: Project[] = [
  {
    title: "GENESIS",
    period: "2026",
    description:
      "Video-conditioned robot learning: agentic video generation flows into navigation and manipulation. Companion codebase for the \"Action Agent\" paper accepted at IROS 2026.",
    tags: ["Agentic Video Generation", "VLA", "Diffusion", "IROS 2026"],
    href: "https://github.com/JeffrinSam/GENESIS",
    linkLabel: "View on GitHub",
    media: [
      { label: "Action Agent", kind: "youtube", src: "jvL1_ckPTDo" },
      { label: "Flow Agent", kind: "video", src: "/media/genesis-flow-agent.mp4" },
    ],
  },
  {
    title: "MTC Industrial Immersion",
    period: "2025",
    description:
      "Synthetic data generation for bimanual robotic manipulation at MTC Group — simulated in NVIDIA Isaac Sim and combined with real-world capture to fine-tune GR00T N1.5 for automating data-center maintenance tasks.",
    tags: ["Isaac Sim", "Bimanual Manipulation", "GR00T N1.5", "Synthetic Data"],
    href: "https://github.com/JeffrinSam",
    linkLabel: "View profile",
    media: [{ label: "Demo", kind: "video", src: "/media/mtc-industrial-immersion.mp4" }],
  },
  {
    title: "VTOL Tailsitter Unity SIL",
    period: "2025",
    description:
      "Unity-based VTOL tail-sitter simulation for software-in-the-loop testing, autonomous flight algorithm validation as a digital twin, and synthetic test-dataset generation. Underpins the YawSitter paper (IEEE ROBIO 2025).",
    tags: ["Unity", "UAV", "SIL Testing", "Digital Twin"],
    href: "https://github.com/JeffrinSam/VTOL-Tailsitter-Unity-SIL",
    linkLabel: "View on GitHub",
    media: [
      { label: "Flight", kind: "gif", src: `${VTOL_RAW}/vtol.gif` },
      { label: "Force Response", kind: "gif", src: `${VTOL_RAW}/force2-.gif` },
    ],
  },
  {
    title: "Synthetic Data for Unitree G1",
    period: "2025",
    description:
      "Generates synthetic joint data for Unitree H1/G1 humanoids via imitation learning in Isaac Lab. Simulated in Isaac Sim, enhanced with Cosmos for realism, and used as the asset to deploy GR00T N1.5 in simulation for pick-and-place tasks.",
    tags: ["Isaac Lab", "GR00T N1.5", "Imitation Learning", "Cosmos"],
    href: "https://github.com/JeffrinSam/JeffrinSam_G1",
    linkLabel: "View on GitHub",
    media: [
      { label: "Pick & Place", kind: "gif", src: `${G1_RAW}/pick.gif` },
      { label: "Demo", kind: "gif", src: `${G1_RAW}/1%20(2).gif` },
    ],
  },
  {
    title: "SONIC: Whole-Body Humanoid Control",
    period: "2025",
    description:
      "Among the first known external deployments of NVIDIA's SONIC (GEAR-SONIC) whole-body control stack — reproducing the large-scale motion-tracking controller end to end in simulation and validating it on a real humanoid.",
    tags: ["Whole-Body Control", "GR00T", "Humanoid Locomotion", "NVIDIA SONIC"],
    href: "https://nvlabs.github.io/GEAR-SONIC/",
    linkLabel: "NVIDIA GEAR-SONIC (official)",
    media: [{ label: "Live Robot", kind: "video", src: "/media/gear-sonic-live.mp4" }],
  },
  {
    title: "JEPA Study",
    period: "2026",
    description:
      "A zero-to-mastery JEPA study guide — 245 notebook cells and 14 GIFs covering JEPA, V-JEPA 2, VLA models, and world models for embodied AI research.",
    tags: ["World Models", "JEPA", "Self-Supervised Learning"],
    href: "https://github.com/JeffrinSam/JEPAstudy",
    linkLabel: "View on GitHub",
  },
  {
    title: "RRT-Based Motion Planning",
    period: "2025",
    description:
      "Comparative evaluation of sampling-based path planners (RRT, RRT*, Informed RRT*, BIT*, Custom RRT*) in 3D environments, with Unity visualizations. Contributed the Unity algorithm implementation and 3D visualization layer with a team of five.",
    tags: ["RRT / RRT*", "Unity", "Motion Planning", "Collaboration"],
    href: "https://github.com/thexuanphuc/path-planning-project",
    linkLabel: "View on GitHub",
    media: [
      { label: "RRT", kind: "gif", src: `${RRT_RAW}/RRT.gif` },
      { label: "RRT*", kind: "gif", src: `${RRT_RAW}/RRT_star.gif` },
      { label: "Informed RRT*", kind: "gif", src: `${RRT_RAW}/Informed_RRT_star.gif` },
      { label: "BIT*", kind: "gif", src: `${RRT_RAW}/BIT_star.gif` },
      { label: "Custom RRT*", kind: "gif", src: `${RRT_RAW}/Custom_RRT.gif` },
    ],
  },
  {
    title: "Quadcopter MPC",
    period: "2025",
    description:
      "Multiple-shooting, point-to-point Model Predictive Control for a quadcopter navigating a 3D environment with static obstacles, formulated with CasADi and solved with IPOPT.",
    tags: ["MPC", "CasADi", "UAV Control"],
    href: "https://github.com/thexuanphuc/drone_mpc",
    linkLabel: "View on GitHub",
    media: [
      { label: "Trajectory 1", kind: "gif", src: `${MPC_RAW}/Movie_009.gif` },
      { label: "Trajectory 2", kind: "gif", src: `${MPC_RAW}/Movie_010.gif` },
    ],
  },
];
