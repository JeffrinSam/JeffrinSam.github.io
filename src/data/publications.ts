export type Publication = {
  title: string;
  venue: string;
  status?: string;
  href?: string;
  video?: string;
};

export const publications: Publication[] = [
  {
    title: "Action Agent: Agentic Video Generation Meets Flow-Constrained Diffusion",
    venue: "IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS 2026)",
    status: "Accepted — Pittsburgh, USA",
    href: "https://github.com/JeffrinSam/GENESIS",
    video: "jvL1_ckPTDo",
  },
  {
    title: "SafeHumanoid: VLM-RAG-Driven Impedance Control of Humanoid Robot",
    venue: "ACM/IEEE International Conference on Human-Robot Interaction (HRI 2026)",
    href: "https://dl.acm.org/doi/10.1145/3776734.3794539",
    video: "t--pn51P6qg",
  },
  {
    title: "TapHRI: TCN-driven Touch Control of Collaborative Robots Using Only Embedded Robot Sensing",
    venue: "ACM/IEEE International Conference on Human-Robot Interaction (HRI 2026)",
    href: "https://dl.acm.org/doi/10.1145/3776734.3794561",
    video: "_lvrgxaFksI",
  },
  {
    title: "GenerativeMPC: VLM-RAG-guided Whole-Body MPC with Virtual Impedance for Bimanual Mobile Manipulation",
    venue: "IEEE International Conference on Systems, Man, and Cybernetics 2026",
    href: "https://arxiv.org/abs/2604.19522",
  },
  {
    title: "DiffusionCinema: Text-to-Aerial Cinematography",
    venue: "ACM/IEEE International Conference on Human-Robot Interaction (HRI 2026)",
    href: "https://dl.acm.org/doi/10.1145/3776734.3794353",
    video: "CBix76IKd3s",
  },
  {
    title: "YawSitter: Modeling and Controlling a Tail-Sitter UAV with Enhanced Yaw Control",
    venue: "IEEE International Conference on Robotics and Biomimetics (ROBIO 2025)",
    href: "https://ieeexplore.ieee.org/iel8/11373909/11375854/11376208.pdf",
  },
  {
    title: "Glove2UAV: A Wearable IMU-Based Glove for Intuitive Control of UAV",
    venue: "ACM/IEEE International Conference on Human-Robot Interaction (HRI 2026)",
    video: "D853qnRxy_U",
  },
  {
    title: "DroneVLA: VLA-based Aerial Manipulation",
    venue: "ACM/IEEE International Conference on Human-Robot Interaction (HRI 2026)",
    href: "https://dl.acm.org/doi/10.1145/3776734.3794572",
  },
];
