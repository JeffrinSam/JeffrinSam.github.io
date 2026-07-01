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

export const certificates: string[] = [
  "TensorFlow Developer — DeepLearning.AI",
  "Google Cloud Skill Badge",
  "MATLAB Onramp",
];

export const courses: string[] = [
  "Modern Robotics: Motion, Kinematics, and Dynamics — Northwestern University",
  "Deep Learning Specialization — DeepLearning.AI",
  "Machine Learning Specialization — Stanford Online",
  "Mathematics for ML and Data Science — DeepLearning.AI",
];
