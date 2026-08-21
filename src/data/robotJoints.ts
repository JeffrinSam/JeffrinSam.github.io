// Generated from g1_29dof_mode_15_brainco_hand.urdf by scripts/urdf-to-glb.py pipeline.
// Axis is expressed in the joint (= child link) frame; limits in radians.
export type RobotJoint = {
  /** URDF joint name */
  name: string;
  /** GLB scene node to rotate (the joint's child link) */
  node: string;
  axis: [number, number, number];
  lower: number;
  upper: number;
};

export const robotJoints: RobotJoint[] = [
  { name: "left_hip_pitch_joint", node: "left_hip_pitch_link", axis: [0, 1, 0], lower: -2.5307, upper: 2.8798 },
  { name: "left_hip_roll_joint", node: "left_hip_roll_link", axis: [1, 0, 0], lower: -0.5236, upper: 2.9671 },
  { name: "left_hip_yaw_joint", node: "left_hip_yaw_link", axis: [0, 0, 1], lower: -2.7576, upper: 2.7576 },
  { name: "left_knee_joint", node: "left_knee_link", axis: [0, 1, 0], lower: -0.0873, upper: 2.8798 },
  { name: "left_ankle_pitch_joint", node: "left_ankle_pitch_link", axis: [0, 1, 0], lower: -0.8727, upper: 0.5236 },
  { name: "left_ankle_roll_joint", node: "left_ankle_roll_link", axis: [1, 0, 0], lower: -0.2618, upper: 0.2618 },
  { name: "right_hip_pitch_joint", node: "right_hip_pitch_link", axis: [0, 1, 0], lower: -2.5307, upper: 2.8798 },
  { name: "right_hip_roll_joint", node: "right_hip_roll_link", axis: [1, 0, 0], lower: -2.9671, upper: 0.5236 },
  { name: "right_hip_yaw_joint", node: "right_hip_yaw_link", axis: [0, 0, 1], lower: -2.7576, upper: 2.7576 },
  { name: "right_knee_joint", node: "right_knee_link", axis: [0, 1, 0], lower: -0.0873, upper: 2.8798 },
  { name: "right_ankle_pitch_joint", node: "right_ankle_pitch_link", axis: [0, 1, 0], lower: -0.8727, upper: 0.5236 },
  { name: "right_ankle_roll_joint", node: "right_ankle_roll_link", axis: [1, 0, 0], lower: -0.2618, upper: 0.2618 },
  { name: "waist_yaw_joint", node: "waist_yaw_link", axis: [0, 0, 1], lower: -2.6180, upper: 2.6180 },
  { name: "waist_roll_joint", node: "waist_roll_link", axis: [1, 0, 0], lower: -0.5200, upper: 0.5200 },
  { name: "waist_pitch_joint", node: "torso_link", axis: [0, 1, 0], lower: -0.5200, upper: 0.5200 },
  { name: "left_shoulder_pitch_joint", node: "left_shoulder_pitch_link", axis: [0, 1, 0], lower: -3.0892, upper: 2.6704 },
  { name: "left_shoulder_roll_joint", node: "left_shoulder_roll_link", axis: [1, 0, 0], lower: -1.5882, upper: 2.2515 },
  { name: "left_shoulder_yaw_joint", node: "left_shoulder_yaw_link", axis: [0, 0, 1], lower: -2.6180, upper: 2.6180 },
  { name: "left_elbow_joint", node: "left_elbow_link", axis: [0, 1, 0], lower: -1.0472, upper: 2.0944 },
  { name: "left_wrist_roll_joint", node: "left_wrist_roll_link", axis: [1, 0, 0], lower: -1.9722, upper: 1.9722 },
  { name: "left_wrist_pitch_joint", node: "left_wrist_pitch_link", axis: [0, 1, 0], lower: -1.6144, upper: 1.6144 },
  { name: "left_wrist_yaw_joint", node: "left_wrist_yaw_link", axis: [0, 0, 1], lower: -1.6144, upper: 1.6144 },
  { name: "left_thumb_metacarpal_joint", node: "left_thumb_metacarpal_Link", axis: [0, 0, 1], lower: 0.0000, upper: 1.5184 },
  { name: "left_thumb_proximal_joint", node: "left_thumb_proximal_Link", axis: [1, 0, 0], lower: 0.0000, upper: 1.0472 },
  { name: "left_thumb_distal_joint", node: "left_thumb_distal_Link", axis: [1, 0, 0], lower: 0.0000, upper: 1.0472 },
  { name: "left_thumb_tip_joint", node: "left_thumb_tip_Link", axis: [-1, 0, 0], lower: 0.0000, upper: 0.0000 },
  { name: "left_index_proximal_joint", node: "left_index_proximal_Link", axis: [0, 1, 0], lower: 0.0000, upper: 1.4661 },
  { name: "left_index_distal_joint", node: "left_index_distal_Link", axis: [0, 1, 0], lower: 0.0000, upper: 1.6930 },
  { name: "left_index_tip_joint", node: "left_index_tip_Link", axis: [0, 1, 0], lower: 1.0000, upper: 1.0000 },
  { name: "left_middle_proximal_joint", node: "left_middle_proximal_Link", axis: [0, 1, 0], lower: 0.0000, upper: 1.4661 },
  { name: "left_middle_distal_joint", node: "left_middle_distal_Link", axis: [0, 1, 0], lower: 0.0000, upper: 1.6930 },
  { name: "left_middle_tip_joint", node: "left_middle_tip_Link", axis: [0, 1, 0], lower: 1.0000, upper: 1.0000 },
  { name: "left_ring_proximal_joint", node: "left_ring_proximal_Link", axis: [0, 1, 0], lower: 0.0000, upper: 1.4661 },
  { name: "left_ring_distal_joint", node: "left_ring_distal_Link", axis: [0, 1, 0], lower: 0.0000, upper: 1.6930 },
  { name: "left_ring_tip_joint", node: "left_ring_tip_Link", axis: [0, 1, 0], lower: 1.0000, upper: 1.0000 },
  { name: "left_pinky_proximal_joint", node: "left_pinky_proximal_Link", axis: [0, 1, 0], lower: 0.0000, upper: 1.4661 },
  { name: "left_pinky_distal_joint", node: "left_pinky_distal_Link", axis: [0, 1, 0], lower: 0.0000, upper: 1.6930 },
  { name: "left_pinky_tip_joint", node: "left_pinky_tip_Link", axis: [0, 1, 0], lower: 1.0000, upper: 1.0000 },
  { name: "right_shoulder_pitch_joint", node: "right_shoulder_pitch_link", axis: [0, 1, 0], lower: -3.0892, upper: 2.6704 },
  { name: "right_shoulder_roll_joint", node: "right_shoulder_roll_link", axis: [1, 0, 0], lower: -2.2515, upper: 1.5882 },
  { name: "right_shoulder_yaw_joint", node: "right_shoulder_yaw_link", axis: [0, 0, 1], lower: -2.6180, upper: 2.6180 },
  { name: "right_elbow_joint", node: "right_elbow_link", axis: [0, 1, 0], lower: -1.0472, upper: 2.0944 },
  { name: "right_wrist_roll_joint", node: "right_wrist_roll_link", axis: [1, 0, 0], lower: -1.9722, upper: 1.9722 },
  { name: "right_wrist_pitch_joint", node: "right_wrist_pitch_link", axis: [0, 1, 0], lower: -1.6144, upper: 1.6144 },
  { name: "right_wrist_yaw_joint", node: "right_wrist_yaw_link", axis: [0, 0, 1], lower: -1.6144, upper: 1.6144 },
  { name: "right_thumb_metacarpal_joint", node: "right_thumb_metacarpal_link", axis: [0, 0, 1], lower: 0.0000, upper: 1.5184 },
  { name: "right_thumb_proximal_joint", node: "right_thumb_proximal_link", axis: [1, 0, 0], lower: 0.0000, upper: 1.0472 },
  { name: "right_thumb_distal_joint", node: "right_thumb_distal_link", axis: [1, 0, 0], lower: 0.0000, upper: 1.0472 },
  { name: "right_thumb_tip", node: "right_thumb_tip", axis: [1, 0, 0], lower: 0.0000, upper: 0.0000 },
  { name: "right_index_proximal_joint", node: "right_index_proximal_link", axis: [0, 1, 0], lower: 0.0000, upper: 1.4661 },
  { name: "right_index_distal_joint", node: "right_index_distal_link", axis: [0, 1, 0], lower: 0.0000, upper: 1.6930 },
  { name: "right_index_tip_joint", node: "right_index_tip", axis: [0, 1, 0], lower: 0.0000, upper: 0.0000 },
  { name: "right_middle_proximal_joint", node: "right_middle_proximal_link", axis: [0, 1, 0], lower: 0.0000, upper: 1.4661 },
  { name: "right_middle_distal_joint", node: "right_middle_distal_link", axis: [0, 1, 0], lower: 0.0000, upper: 1.6930 },
  { name: "right_middle_tip_joint", node: "right_middle_tip", axis: [0, 1, 0], lower: 0.0000, upper: 0.0000 },
  { name: "right_ring_proximal_joint", node: "right_ring_proximal_link", axis: [0, 1, 0], lower: 0.0000, upper: 1.4661 },
  { name: "right_ring_distal_joint", node: "right_ring_distal_link", axis: [0, 1, 0], lower: 0.0000, upper: 1.6930 },
  { name: "right_ring_tip_joint", node: "right_ring_tip", axis: [0, 1, 0], lower: 0.0000, upper: 0.0000 },
  { name: "right_pinky_proximal_joint", node: "right_pinky_proximal_link", axis: [0, 1, 0], lower: 0.0000, upper: 1.4661 },
  { name: "right_pinky_distal_joint", node: "right_pinky_distal_link", axis: [0, 1, 0], lower: 0.0000, upper: 1.6930 },
  { name: "right_pinky_tip_joint", node: "right_pinky_tip", axis: [0, 1, 0], lower: 0.0000, upper: 0.0000 },
];

export const jointsByName = new Map(robotJoints.map((j) => [j.name, j]));
