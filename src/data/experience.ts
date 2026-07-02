export type ExperienceEntry = {
  period: string;
  role: string;
  org: string;
  location: string;
  description: string;
};

export const experience: ExperienceEntry[] = [
  {
    period: "10.2024 — Present",
    role: "Graduate Student Researcher (Physical AI)",
    org: "Skoltech, ISR Lab",
    location: "Moscow, Russia",
    description:
      "Research in Physical AI, Agentic AI, Vision-Language-Action (VLA) systems, and foundation world models for humanoid robots. Build large-scale synthetic data pipelines in NVIDIA Isaac Sim/Lab for Unitree G1/H1 for imitation learning, RL, and VLA training. Train and fine-tune foundation models (GR00T, Cosmos, Wan 2.2) on multi-GPU clusters for robot learning, video generation, and embodied intelligence.",
  },
  {
    period: "09.2025 — 01.2026",
    role: "Guest Instructor — Robotics Simulation",
    org: "Yerevan State University",
    location: "Yerevan, Armenia",
    description:
      "Designed and delivered a 3-month advanced workshop on robotics simulation covering NVIDIA Isaac Sim/Lab, Unity, ROS2 deployment, synthetic data generation, and reinforcement & imitation learning for robust robotic policies.",
  },
  {
    period: "05.2025 — 12.2025",
    role: "Robotic Simulation Researcher",
    org: "MTC Group",
    location: "Remote",
    description:
      "Developed and validated Vision-Language-Action (VLA) models for bimanual robotic manipulation, building simulations in NVIDIA Isaac Sim, collecting real-world and simulation data, and fine-tuning NVIDIA Isaac GR00T N1.5 to automate data-center maintenance tasks.",
  },
  {
    period: "06.2023 — 02.2025",
    role: "STEM Tutor & Project Advisor",
    org: "Al Manal Training L.L.C",
    location: "Abu Dhabi, UAE",
    description:
      "One-on-one and group tutoring in engineering mathematics, circuit analysis, robotics, and computer vision. Mentored students on final-year projects, translating theoretical knowledge into practical applications.",
  },
  {
    period: "07.2023 — 08.2024",
    role: "Robotic Instructor",
    org: "Time Master",
    location: "Abu Dhabi, UAE",
    description:
      "Taught a hands-on robotics curriculum for teenagers using the RoboRobo module — robot assembly, electronics, and programming in Scratch and C++, including multi-level courses on 6V/12V systems and logic programming.",
  },
  {
    period: "06.2021 — 01.2023",
    role: "Production Engineer",
    org: "Arasan Soap Works PLC",
    location: "India",
    description:
      "Oversaw production processes and machinery maintenance, analyzing power systems in MATLAB/Simulink. Led the \"Decarbonization of Industry\" project integrating sustainable practices and renewable energy into operations.",
  },
];

export type EducationEntry = {
  period: string;
  degree: string;
  org: string;
  location: string;
  note?: string;
  thesis?: string;
};

export const education: EducationEntry[] = [
  {
    period: "09.2024 — 06.2026",
    degree: "M.Sc. in Engineering Systems (Robotics)",
    org: "Skolkovo Institute of Science and Technology (Skoltech)",
    location: "Moscow, Russia",
    note: "Distinction with Honours",
    thesis:
      "Video World Model with Closed-Loop Iterative Replanning for Cross-Embodiment Robot Manipulation",
  },
  {
    period: "09.2017 — 05.2022",
    degree: "B.E. in Electronics & Communication",
    org: "Anna University — St. Xavier's Catholic College of Engineering",
    location: "Nagercoil, India",
    note: "CGPA 8.23/10 (First Class)",
  },
];
