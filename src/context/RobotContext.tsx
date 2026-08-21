import React, { createContext, useContext, useState } from "react";

export type RobotFormation = "solo" | "duet" | "trio";
export type DanceMoveKey =
  | "auto"
  | "groove"
  | "wave"
  | "robot"
  | "disco"
  | "taichi"
  | "breakdance"
  | "hype";

interface RobotContextType {
  enabled: boolean;
  setEnabled: (val: boolean) => void;
  toggleEnabled: () => void;
  formation: RobotFormation;
  setFormation: (formation: RobotFormation) => void;
  move: DanceMoveKey;
  setMove: (move: DanceMoveKey) => void;
  speed: number;
  setSpeed: (speed: number) => void;
  isControlsOpen: boolean;
  setIsControlsOpen: (open: boolean) => void;
  toggleControls: () => void;
}

const RobotContext = createContext<RobotContextType | undefined>(undefined);

const STORAGE_KEY_ENABLED = "jeff_robot_enabled";
const STORAGE_KEY_FORMATION = "jeff_robot_formation";
const STORAGE_KEY_MOVE = "jeff_robot_move";
const STORAGE_KEY_SPEED = "jeff_robot_speed";

export function RobotProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabledState] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_ENABLED);
    return saved !== null ? saved === "true" : true;
  });

  const [formation, setFormationState] = useState<RobotFormation>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_FORMATION) as RobotFormation;
    return saved === "solo" || saved === "duet" || saved === "trio" ? saved : "trio";
  });

  const [move, setMoveState] = useState<DanceMoveKey>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_MOVE) as DanceMoveKey;
    return saved || "auto";
  });

  const [speed, setSpeedState] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_SPEED);
    const parsed = saved ? parseFloat(saved) : 1;
    return !isNaN(parsed) && parsed >= 0.25 && parsed <= 2.5 ? parsed : 1;
  });

  const [isControlsOpen, setIsControlsOpen] = useState(false);

  const setEnabled = (val: boolean) => {
    setEnabledState(val);
    localStorage.setItem(STORAGE_KEY_ENABLED, String(val));
  };

  const toggleEnabled = () => setEnabled(!enabled);

  const setFormation = (fmt: RobotFormation) => {
    setFormationState(fmt);
    localStorage.setItem(STORAGE_KEY_FORMATION, fmt);
  };

  const setMove = (mv: DanceMoveKey) => {
    setMoveState(mv);
    localStorage.setItem(STORAGE_KEY_MOVE, mv);
  };

  const setSpeed = (spd: number) => {
    setSpeedState(spd);
    localStorage.setItem(STORAGE_KEY_SPEED, String(spd));
  };

  const toggleControls = () => setIsControlsOpen((prev) => !prev);

  return (
    <RobotContext.Provider
      value={{
        enabled,
        setEnabled,
        toggleEnabled,
        formation,
        setFormation,
        move,
        setMove,
        speed,
        setSpeed,
        isControlsOpen,
        setIsControlsOpen,
        toggleControls,
      }}
    >
      {children}
    </RobotContext.Provider>
  );
}

export function useRobot() {
  const context = useContext(RobotContext);
  if (!context) {
    throw new Error("useRobot must be used within a RobotProvider");
  }
  return context;
}
