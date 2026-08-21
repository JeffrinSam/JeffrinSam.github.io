export type MoveJoint = {
  joint: string;
  amp: number;
  freq: number;
  phase?: number;
  offset?: number;
  /** Quantize the sine into N steps for the mechanical robot popping */
  steps?: number;
};

export type MoveDefinition = {
  name: string;
  label: string;
  description: string;
  joints: MoveJoint[];
  /** Whole-body vertical bounce multiplier */
  bobAmp?: number;
  bobFreq?: number;
  /** Turntable body rotation amplitude */
  bodyYawAmp?: number;
  bodyYawFreq?: number;
};

export const MOVE_CYCLE_ORDER = [
  "groove",
  "breakdance",
  "wave",
  "disco",
  "robot",
  "taichi",
  "hype",
] as const;

export type BuiltinMoveName = (typeof MOVE_CYCLE_ORDER)[number];

export const DANCE_MOVES: Record<BuiltinMoveName, MoveDefinition> = {
  groove: {
    name: "groove",
    label: "Groove Bounce",
    description: "Rhythmic full-body bounce with hip sway and synchronized arm swings",
    bobAmp: 0.045,
    bobFreq: 4,
    bodyYawAmp: 0.35,
    bodyYawFreq: 0.15,
    joints: [
      // Legs & hips
      { joint: "left_knee_joint", amp: 0.3, freq: 2, offset: 0.3 },
      { joint: "right_knee_joint", amp: 0.3, freq: 2, offset: 0.3 },
      { joint: "left_hip_pitch_joint", amp: -0.18, freq: 2, offset: -0.18 },
      { joint: "right_hip_pitch_joint", amp: -0.18, freq: 2, offset: -0.18 },
      { joint: "left_ankle_pitch_joint", amp: -0.12, freq: 2, offset: -0.12 },
      { joint: "right_ankle_pitch_joint", amp: -0.12, freq: 2, offset: -0.12 },
      // Torso
      { joint: "waist_yaw_joint", amp: 0.35, freq: 1 },
      { joint: "waist_roll_joint", amp: 0.15, freq: 2, phase: Math.PI / 2 },
      { joint: "waist_pitch_joint", amp: 0.08, freq: 2, offset: 0.05 },
      // Left arm
      { joint: "left_shoulder_pitch_joint", amp: 0.5, freq: 1 },
      { joint: "left_shoulder_roll_joint", amp: 0.15, freq: 2, offset: 0.3 },
      { joint: "left_elbow_joint", amp: 0.35, freq: 2, offset: 0.6 },
      { joint: "left_wrist_roll_joint", amp: 0.6, freq: 2 },
      // Right arm
      { joint: "right_shoulder_pitch_joint", amp: 0.5, freq: 1, phase: Math.PI },
      { joint: "right_shoulder_roll_joint", amp: 0.15, freq: 2, offset: -0.3 },
      { joint: "right_elbow_joint", amp: 0.35, freq: 2, phase: Math.PI, offset: 0.6 },
      { joint: "right_wrist_roll_joint", amp: 0.6, freq: 2, phase: Math.PI },
      // Fingers natural curl
      { joint: "left_index_proximal_joint", amp: 0.2, freq: 2, offset: 0.4 },
      { joint: "right_index_proximal_joint", amp: 0.2, freq: 2, offset: 0.4 },
      { joint: "left_thumb_proximal_joint", amp: 0.1, freq: 2, offset: 0.3 },
      { joint: "right_thumb_proximal_joint", amp: 0.1, freq: 2, offset: 0.3 },
    ],
  },

  breakdance: {
    name: "breakdance",
    label: "Cyber Breakbeat",
    description: "Dynamic top-rock footwork with arm crosses and energetic pops",
    bobAmp: 0.065,
    bobFreq: 2.5,
    bodyYawAmp: 0.5,
    bodyYawFreq: 0.4,
    joints: [
      // Deep knee bounce
      { joint: "left_knee_joint", amp: 0.45, freq: 2.5, offset: 0.45, phase: 0 },
      { joint: "right_knee_joint", amp: 0.45, freq: 2.5, offset: 0.45, phase: Math.PI },
      { joint: "left_hip_pitch_joint", amp: -0.28, freq: 2.5, offset: -0.28 },
      { joint: "right_hip_pitch_joint", amp: -0.28, freq: 2.5, offset: -0.28, phase: Math.PI },
      { joint: "left_hip_roll_joint", amp: 0.2, freq: 1.25, offset: 0.1 },
      { joint: "right_hip_roll_joint", amp: -0.2, freq: 1.25, offset: -0.1 },
      // Aggressive torso twist
      { joint: "waist_yaw_joint", amp: 0.6, freq: 1.25 },
      { joint: "waist_pitch_joint", amp: 0.18, freq: 2.5, offset: 0.1 },
      { joint: "waist_roll_joint", amp: 0.2, freq: 1.25, phase: Math.PI / 2 },
      // Crossing arms top-rock
      { joint: "left_shoulder_pitch_joint", amp: 0.7, freq: 1.25, offset: -0.2 },
      { joint: "left_shoulder_roll_joint", amp: 0.4, freq: 1.25, offset: 0.5 },
      { joint: "left_elbow_joint", amp: 0.7, freq: 2.5, offset: 1.0 },
      { joint: "left_wrist_roll_joint", amp: 0.8, freq: 2.5 },
      { joint: "right_shoulder_pitch_joint", amp: 0.7, freq: 1.25, phase: Math.PI, offset: -0.2 },
      { joint: "right_shoulder_roll_joint", amp: 0.4, freq: 1.25, phase: Math.PI, offset: -0.5 },
      { joint: "right_elbow_joint", amp: 0.7, freq: 2.5, phase: Math.PI, offset: 1.0 },
      { joint: "right_wrist_roll_joint", amp: 0.8, freq: 2.5, phase: Math.PI },
      // Gripping hands
      { joint: "left_index_proximal_joint", amp: 0.3, freq: 2.5, offset: 0.6 },
      { joint: "left_middle_proximal_joint", amp: 0.3, freq: 2.5, offset: 0.6 },
      { joint: "right_index_proximal_joint", amp: 0.3, freq: 2.5, offset: 0.6 },
      { joint: "right_middle_proximal_joint", amp: 0.3, freq: 2.5, offset: 0.6 },
    ],
  },

  wave: {
    name: "wave",
    label: "Wave & Greet",
    description: "Friendly high-hand wave with smooth side-to-side weight shifting",
    bobAmp: 0.02,
    bobFreq: 1,
    bodyYawAmp: 0.2,
    bodyYawFreq: 0.2,
    joints: [
      // Right arm waving high
      { joint: "right_shoulder_pitch_joint", amp: 0.15, freq: 3, offset: -1.35 },
      { joint: "right_shoulder_roll_joint", amp: 0.1, freq: 3, offset: -0.6 },
      { joint: "right_elbow_joint", amp: 0.2, freq: 3, offset: 0.8 },
      { joint: "right_wrist_roll_joint", amp: 0.9, freq: 3 },
      { joint: "right_wrist_pitch_joint", amp: 0.3, freq: 3 },
      // Left arm resting gesture
      { joint: "left_shoulder_pitch_joint", amp: 0.1, freq: 1, offset: 0.2 },
      { joint: "left_shoulder_roll_joint", amp: 0.08, freq: 1, offset: 0.25 },
      { joint: "left_elbow_joint", amp: 0.1, freq: 1, offset: 0.4 },
      // Torso sway
      { joint: "waist_yaw_joint", amp: 0.25, freq: 0.8 },
      { joint: "waist_roll_joint", amp: 0.08, freq: 0.8 },
      { joint: "left_knee_joint", amp: 0.08, freq: 0.8, offset: 0.15 },
      { joint: "right_knee_joint", amp: 0.08, freq: 0.8, offset: 0.15, phase: Math.PI },
      // Open hand wave
      { joint: "right_index_proximal_joint", amp: 0.15, freq: 3, offset: 0.1 },
      { joint: "right_middle_proximal_joint", amp: 0.15, freq: 3, offset: 0.1 },
    ],
  },

  disco: {
    name: "disco",
    label: "Retro Disco Point",
    description: "Classic John Travolta 70s diagonal pointing with energetic hip pumps",
    bobAmp: 0.05,
    bobFreq: 2,
    bodyYawAmp: 0.4,
    bodyYawFreq: 0.5,
    joints: [
      // Pointing skyward right, hip tilt left
      { joint: "right_shoulder_pitch_joint", amp: 1.1, freq: 1, offset: -0.6 },
      { joint: "right_shoulder_roll_joint", amp: 0.5, freq: 1, offset: -0.4 },
      { joint: "right_elbow_joint", amp: 0.4, freq: 2, offset: 0.2 },
      { joint: "right_wrist_pitch_joint", amp: 0.5, freq: 1 },
      // Left hand on hip / tucked
      { joint: "left_shoulder_pitch_joint", amp: 0.2, freq: 1, offset: 0.3 },
      { joint: "left_shoulder_roll_joint", amp: 0.3, freq: 1, offset: 0.4 },
      { joint: "left_elbow_joint", amp: 0.4, freq: 1, offset: 1.3 },
      // Hip groove
      { joint: "waist_yaw_joint", amp: 0.4, freq: 1 },
      { joint: "waist_roll_joint", amp: 0.3, freq: 2, phase: Math.PI / 2 },
      { joint: "left_knee_joint", amp: 0.25, freq: 2, offset: 0.25 },
      { joint: "right_knee_joint", amp: 0.25, freq: 2, offset: 0.25, phase: Math.PI },
      // Pointing finger index extended, rest curled
      { joint: "right_index_proximal_joint", amp: 0.05, freq: 1, offset: 0.0 },
      { joint: "right_middle_proximal_joint", amp: 0.1, freq: 1, offset: 1.2 },
      { joint: "right_ring_proximal_joint", amp: 0.1, freq: 1, offset: 1.2 },
      { joint: "right_pinky_proximal_joint", amp: 0.1, freq: 1, offset: 1.2 },
    ],
  },

  robot: {
    name: "robot",
    label: "Cyber Lock & Pop",
    description: "Quantized mechanical joint step-ticks and robotic head-torso isolates",
    bobAmp: 0.015,
    bobFreq: 1.5,
    bodyYawAmp: 0.3,
    bodyYawFreq: 0.2,
    joints: [
      // Quantized steps for pure mechanical feeling
      { joint: "waist_yaw_joint", amp: 0.55, freq: 0.65, steps: 4 },
      { joint: "waist_pitch_joint", amp: 0.2, freq: 1.3, steps: 3 },
      { joint: "waist_roll_joint", amp: 0.15, freq: 1.3, steps: 3 },
      // Right angle arm locks
      { joint: "left_shoulder_pitch_joint", amp: 0.8, freq: 1.3, steps: 3 },
      { joint: "left_shoulder_roll_joint", amp: 0.4, freq: 1.3, offset: 0.3, steps: 3 },
      { joint: "left_elbow_joint", amp: 0.6, freq: 1.3, phase: Math.PI, offset: 0.7, steps: 3 },
      { joint: "left_wrist_yaw_joint", amp: 0.9, freq: 2.6, steps: 2 },
      { joint: "right_shoulder_pitch_joint", amp: 0.8, freq: 1.3, phase: Math.PI, steps: 3 },
      { joint: "right_shoulder_roll_joint", amp: 0.4, freq: 1.3, phase: Math.PI, offset: -0.3, steps: 3 },
      { joint: "right_elbow_joint", amp: 0.6, freq: 1.3, offset: 0.7, steps: 3 },
      { joint: "right_wrist_yaw_joint", amp: 0.9, freq: 2.6, phase: Math.PI, steps: 2 },
      // Stiff robotic knee steps
      { joint: "left_knee_joint", amp: 0.15, freq: 1.3, offset: 0.18, steps: 3 },
      { joint: "right_knee_joint", amp: 0.15, freq: 1.3, phase: Math.PI, offset: 0.18, steps: 3 },
    ],
  },

  taichi: {
    name: "taichi",
    label: "Tai-Chi Fluid Stance",
    description: "Graceful, harmonic sweeping arcs with slow meditative weight shifts",
    bobAmp: 0.03,
    bobFreq: 0.5,
    bodyYawAmp: 0.3,
    bodyYawFreq: 0.2,
    joints: [
      // Smooth slow arm circles
      { joint: "left_shoulder_pitch_joint", amp: 0.6, freq: 0.4, offset: -0.3 },
      { joint: "left_shoulder_roll_joint", amp: 0.45, freq: 0.4, offset: 0.4, phase: Math.PI / 2 },
      { joint: "left_elbow_joint", amp: 0.5, freq: 0.4, offset: 0.7 },
      { joint: "left_wrist_roll_joint", amp: 0.5, freq: 0.4 },
      { joint: "right_shoulder_pitch_joint", amp: 0.6, freq: 0.4, offset: -0.3, phase: Math.PI },
      { joint: "right_shoulder_roll_joint", amp: 0.45, freq: 0.4, offset: -0.4, phase: -Math.PI / 2 },
      { joint: "right_elbow_joint", amp: 0.5, freq: 0.4, offset: 0.7, phase: Math.PI },
      { joint: "right_wrist_roll_joint", amp: 0.5, freq: 0.4, phase: Math.PI },
      // Slow weight shift
      { joint: "waist_yaw_joint", amp: 0.4, freq: 0.2 },
      { joint: "waist_roll_joint", amp: 0.15, freq: 0.4 },
      { joint: "left_knee_joint", amp: 0.2, freq: 0.4, offset: 0.3 },
      { joint: "right_knee_joint", amp: 0.2, freq: 0.4, offset: 0.3, phase: Math.PI },
      { joint: "left_hip_roll_joint", amp: 0.12, freq: 0.4 },
      { joint: "right_hip_roll_joint", amp: -0.12, freq: 0.4 },
      // Relaxed open palms
      { joint: "left_index_proximal_joint", amp: 0.1, freq: 0.4, offset: 0.2 },
      { joint: "right_index_proximal_joint", amp: 0.1, freq: 0.4, offset: 0.2 },
    ],
  },

  hype: {
    name: "hype",
    label: "Hype Celebration",
    description: "Double overhead cheering pumps and enthusiastic victory jumping",
    bobAmp: 0.08,
    bobFreq: 3,
    bodyYawAmp: 0.25,
    bodyYawFreq: 0.5,
    joints: [
      // Both arms pumping high overhead
      { joint: "left_shoulder_pitch_joint", amp: 0.4, freq: 3, offset: -1.6 },
      { joint: "left_shoulder_roll_joint", amp: 0.25, freq: 3, offset: 0.6 },
      { joint: "left_elbow_joint", amp: 0.5, freq: 3, offset: 1.1 },
      { joint: "left_wrist_pitch_joint", amp: 0.4, freq: 3 },
      { joint: "right_shoulder_pitch_joint", amp: 0.4, freq: 3, offset: -1.6 },
      { joint: "right_shoulder_roll_joint", amp: 0.25, freq: 3, offset: -0.6 },
      { joint: "right_elbow_joint", amp: 0.5, freq: 3, offset: 1.1 },
      { joint: "right_wrist_pitch_joint", amp: 0.4, freq: 3 },
      // Fast bounce legs
      { joint: "left_knee_joint", amp: 0.3, freq: 3, offset: 0.3 },
      { joint: "right_knee_joint", amp: 0.3, freq: 3, offset: 0.3 },
      { joint: "left_hip_pitch_joint", amp: -0.2, freq: 3, offset: -0.2 },
      { joint: "right_hip_pitch_joint", amp: -0.2, freq: 3, offset: -0.2 },
      { joint: "waist_pitch_joint", amp: 0.15, freq: 3, offset: 0.1 },
      { joint: "waist_yaw_joint", amp: 0.2, freq: 1.5 },
      // Pump fists
      { joint: "left_index_proximal_joint", amp: 0.2, freq: 3, offset: 0.9 },
      { joint: "right_index_proximal_joint", amp: 0.2, freq: 3, offset: 0.9 },
    ],
  },
};
