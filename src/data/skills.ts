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

export const certifications: Credential[] = [
  { label: "Claude AI Fluency: Framework & Foundations — Anthropic", href: "https://verify.skilljar.com/c/5oee52odpdc4" },
  {
    label: "Modern Robotics: Mechanics, Planning, and Control — Northwestern University",
    href: "https://coursera.org/verify/specialization/PM8PTPYWM4KG",
  },
  { label: "Deep Learning Specialization — DeepLearning.AI", href: "https://coursera.org/verify/specialization/YYA5RMENLVN5" },
  { label: "Machine Learning Specialization — Stanford Online", href: "https://coursera.org/verify/specialization/RRBXTZJGJZ5W" },
  {
    label: "Mathematics for ML and Data Science — DeepLearning.AI",
    href: "https://coursera.org/verify/specialization/J8JAFNKHWE2J",
  },
  { label: "Basic Robotic Behaviors and Odometry (with Honors) — CU Boulder", href: "https://coursera.org/verify/QY7Z5FV3QYX8" },
  { label: "Foundations: Data, Data, Everywhere — Google", href: "https://coursera.org/verify/85JW2EGUAUMY" },
  { label: "Programming for Everybody — University of Michigan", href: "https://coursera.org/verify/VV9VHD7AXGMP" },
  {
    label: "Generative AI Fundamentals — Google",
    href: "https://www.skills.google/public_profiles/2c9425d5-0070-4220-8f41-402743909061/badges/4171549",
  },
  { label: "TensorFlow Developer — DeepLearning.AI" },
  { label: "MATLAB Certified Onramp — MATLAB@UCL" },
  { label: "IELTS — CEFR Level C1 — British Council" },
];

export const organizations: Credential[] = [
  { label: "ACM Student Member — Skoltech (Jan 2026 – Present)" },
  { label: "IEEE Graduate Student Member — Skoltech (Dec 2025 – Present)" },
  { label: "IEEE Student Member — Anna University (2020 – Present)" },
  { label: "National Service Scheme Volunteer (2018–2020) — Jal Shakti Abhiyan Award, Govt. of India, 2019" },
];
