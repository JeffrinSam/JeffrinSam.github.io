export type SkillGroup = {
  category: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "AI & Robotics",
    items: [
      "Vision-Language-Action (VLA)",
      "World Models",
      "GR00T",
      "Cosmos",
      "Wan 2.2",
      "JEPA",
      "Imitation & Reinforcement Learning",
    ],
  },
  {
    category: "Simulation & Tooling",
    items: ["NVIDIA Isaac Sim / Lab", "MuJoCo", "Unity", "ROS2", "CoppeliaSim"],
  },
  {
    category: "Programming",
    items: ["Python", "C++", "C#", "MATLAB / Simulink"],
  },
  {
    category: "Hardware & Platforms",
    items: ["Unitree G1 / H1", "UAV / VTOL Systems", "Oscilloscope", "Function Generator", "Digital Multimeter"],
  },
];

export type Credential = { label: string; href?: string };

export const certificates: Credential[] = [
  { label: "Generative AI Fundamentals — Google", href: "https://www.skills.google/public_profiles/2c9425d5-0070-4220-8f41-402743909061/badges/4171549" },
  { label: "TensorFlow Developer — DeepLearning.AI" },
  { label: "MATLAB Onramp" },
];

export const courses: Credential[] = [
  {
    label: "Modern Robotics: Motion, Kinematics, and Dynamics — Northwestern University",
    href: "https://www.coursera.org/account/accomplishments/specialization/certificate/NKG8J99F4YAT",
  },
  {
    label: "Deep Learning Specialization — DeepLearning.AI",
    href: "https://coursera.org/verify/specialization/YYA5RMENLVN5",
  },
  {
    label: "Machine Learning Specialization — Stanford Online",
    href: "https://coursera.org/verify/specialization/RRBXTZJGJZ5W",
  },
  {
    label: "Mathematics for ML and Data Science — DeepLearning.AI",
    href: "https://www.coursera.org/account/accomplishments/specialization/certificate/PM8PTPYWM4KG",
  },
];
