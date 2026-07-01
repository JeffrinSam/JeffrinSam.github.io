export type Project = {
  title: string;
  period: string;
  description: string;
  tags: string[];
  href: string;
  linkLabel: string;
  video?: string;
};

export const projects: Project[] = [
  {
    title: "GENESIS",
    period: "2026",
    description:
      "Video-conditioned robot learning: agentic video generation flows into navigation and manipulation. Companion codebase for the \"Action Agent\" paper accepted at IROS 2026.",
    tags: ["Agentic Video Generation", "VLA", "Diffusion", "IROS 2026"],
    href: "https://github.com/JeffrinSam/GENESIS",
    linkLabel: "View on GitHub",
  },
  {
    title: "MTC Industrial Immersion",
    period: "2025",
    description:
      "Synthetic data generation for bimanual robotic manipulation at MTC Group — simulated in NVIDIA Isaac Sim and combined with real-world capture to fine-tune GR00T N1.5 for automating data-center maintenance tasks.",
    tags: ["Isaac Sim", "Bimanual Manipulation", "GR00T N1.5", "Synthetic Data"],
    href: "https://github.com/JeffrinSam",
    linkLabel: "View profile",
    video: "/media/mtc-industrial-immersion.mp4",
  },
  {
    title: "VTOL Tailsitter Unity SIL",
    period: "2025",
    description:
      "Unity-based VTOL tail-sitter simulation for software-in-the-loop testing, autonomous flight algorithm validation as a digital twin, and synthetic test-dataset generation. Underpins the YawSitter paper (IEEE ROBIO 2025).",
    tags: ["Unity", "UAV", "SIL Testing", "Digital Twin"],
    href: "https://github.com/JeffrinSam/VTOL-Tailsitter-Unity-SIL",
    linkLabel: "View on GitHub",
  },
  {
    title: "Synthetic Data for Unitree G1",
    period: "2025",
    description:
      "Generates synthetic joint data for Unitree H1/G1 humanoids via imitation learning in Isaac Lab. Simulated in Isaac Sim, enhanced with Cosmos for realism, and used as the asset to deploy GR00T N1.5 in simulation for pick-and-place tasks.",
    tags: ["Isaac Lab", "GR00T N1.5", "Imitation Learning", "Cosmos"],
    href: "https://github.com/JeffrinSam/JeffrinSam_G1",
    linkLabel: "View on GitHub",
  },
  {
    title: "GR00T Whole-Body Control",
    period: "2025",
    description:
      "Own implementation and simulation study built on top of NVIDIA's GR00T-WholeBodyControl, exploring whole-body loco-manipulation policies for humanoid control.",
    tags: ["Whole-Body Control", "GR00T", "Humanoid Locomotion"],
    href: "https://github.com/NVlabs/GR00T-WholeBodyControl",
    linkLabel: "Reference: NVlabs/GR00T-WholeBodyControl",
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
  },
  {
    title: "Quadcopter MPC",
    period: "2025",
    description:
      "Multiple-shooting, point-to-point Model Predictive Control for a quadcopter navigating a 3D environment with static obstacles, formulated with CasADi and solved with IPOPT.",
    tags: ["MPC", "CasADi", "UAV Control"],
    href: "https://github.com/thexuanphuc/drone_mpc",
    linkLabel: "View on GitHub",
  },
];
