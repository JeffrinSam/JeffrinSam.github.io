import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineSparkles,
  HiOutlinePower,
  HiOutlineXMark,
  HiOutlineUser,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { TbRobot } from "react-icons/tb";
import { useRobot, type RobotFormation, type DanceMoveKey } from "../context/RobotContext";
import { DANCE_MOVES, MOVE_CYCLE_ORDER } from "../data/robotMoves";

const FORMATION_OPTIONS: { id: RobotFormation; label: string; icon: any; count: string }[] = [
  { id: "solo", label: "Solo", icon: HiOutlineUser, count: "1 Robot" },
  { id: "duet", label: "Duet", icon: HiOutlineUserGroup, count: "2 Robots" },
  { id: "trio", label: "Trio Crew", icon: TbRobot, count: "3 Robots" },
];

const SPEED_OPTIONS = [
  { value: 0.6, label: "0.6x Slow" },
  { value: 1.0, label: "1.0x Normal" },
  { value: 1.5, label: "1.5x Fast" },
  { value: 2.0, label: "2.0x Turbo" },
];

export function RobotControls() {
  const {
    enabled,
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
  } = useRobot();

  return (
    <aside aria-label="Robot playground controls" className="fixed bottom-6 right-6 z-40">
      {/* Floating Minimized Pill / HUD Launcher */}
      <AnimatePresence>
        {!isControlsOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            {/* Quick ON / OFF Button */}
            <button
              onClick={toggleEnabled}
              title={enabled ? "Turn 3D Robots OFF" : "Turn 3D Robots ON"}
              className={`flex h-11 w-11 items-center justify-center rounded-full border shadow-xl backdrop-blur-md transition-all ${
                enabled
                  ? "border-brand bg-surface/90 text-brand-text hover:scale-105 hover:border-brand-text"
                  : "border-theme bg-surface/80 text-theme-muted hover:border-ink hover:text-ink"
              }`}
            >
              <HiOutlinePower size={20} className={enabled ? "animate-pulse text-brand" : ""} />
            </button>

            {/* Main HUD Controls Launcher Button */}
            <button
              onClick={toggleControls}
              className={`group flex items-center gap-2.5 rounded-full border px-4 py-2.5 shadow-xl backdrop-blur-md transition-all hover:scale-105 ${
                enabled
                  ? "border-brand/40 bg-surface/90 text-ink hover:border-brand"
                  : "border-theme bg-surface/75 text-theme-muted hover:text-ink"
              }`}
            >
              <div className="relative">
                <TbRobot size={20} className={enabled ? "text-brand" : "text-theme-muted"} />
                {enabled && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold tracking-wide uppercase">
                {enabled ? `${formation.toUpperCase()} • ${move === "auto" ? "AUTO DANCE" : move.toUpperCase()}` : "ROBOT OFF"}
              </span>
              <HiOutlineSparkles size={15} className="text-brand opacity-80 transition-transform group-hover:rotate-12" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Futuristic Control HUD Modal */}
      <AnimatePresence>
        {isControlsOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="border-theme bg-surface/95 w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl border p-5 shadow-2xl backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-theme pb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/15 text-brand">
                  <TbRobot size={22} />
                </div>
                <div>
                  <h3 className="font-[var(--font-display)] text-sm font-bold text-ink">
                    Unitree G1 Motion Lab
                  </h3>
                  <p className="text-[11px] text-theme-muted">Interactive 3D Robot Playground</p>
                </div>
              </div>
              <button
                onClick={() => setIsControlsOpen(false)}
                className="rounded-full p-1.5 text-theme-muted transition-colors hover:bg-surface-elevated hover:text-ink"
              >
                <HiOutlineXMark size={18} />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              {/* Power Toggle Switch */}
              <div className="flex items-center justify-between rounded-xl bg-surface-elevated/70 p-3">
                <div className="flex items-center gap-2">
                  <HiOutlinePower size={18} className={enabled ? "text-brand" : "text-theme-muted"} />
                  <span className="font-medium text-ink">3D Robot Background</span>
                </div>
                <button
                  onClick={toggleEnabled}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    enabled ? "bg-brand" : "bg-neutral-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      enabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Formations (Solo / Duet / Trio) */}
              <div>
                <label className="mb-2 block font-medium uppercase tracking-wider text-theme-muted text-[11px]">
                  Formation & Robot Count
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {FORMATION_OPTIONS.map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = formation === opt.id;
                    return (
                      <button
                        key={opt.id}
                        disabled={!enabled}
                        onClick={() => setFormation(opt.id)}
                        className={`flex flex-col items-center justify-center gap-1 rounded-xl border p-2.5 transition-all ${
                          isSelected && enabled
                            ? "border-brand bg-brand/10 text-brand font-semibold shadow-sm"
                            : "border-theme bg-surface-elevated/40 text-theme-muted hover:border-ink hover:text-ink disabled:opacity-40"
                        }`}
                      >
                        <Icon size={18} />
                        <span className="text-[11px]">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dance Choreography Actions */}
              <div>
                <label className="mb-2 block font-medium uppercase tracking-wider text-theme-muted text-[11px]">
                  Dance Moves & Actions
                </label>
                <div className="grid grid-cols-2 gap-1.5 max-h-40 overflow-y-auto pr-1">
                  {/* Auto Cycle */}
                  <button
                    disabled={!enabled}
                    onClick={() => setMove("auto")}
                    className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 text-left transition-all ${
                      move === "auto" && enabled
                        ? "border-brand bg-brand/15 text-brand font-semibold"
                        : "border-theme bg-surface-elevated/40 text-theme-muted hover:text-ink disabled:opacity-40"
                    }`}
                  >
                    <HiOutlineSparkles size={14} className="text-brand shrink-0" />
                    <span className="truncate">Auto Cycle All</span>
                  </button>

                  {MOVE_CYCLE_ORDER.map((mvKey) => {
                    const mv = DANCE_MOVES[mvKey];
                    const isSelected = move === mvKey;
                    return (
                      <button
                        key={mvKey}
                        disabled={!enabled}
                        onClick={() => setMove(mvKey as DanceMoveKey)}
                        className={`flex items-center justify-between rounded-lg border px-2.5 py-2 text-left transition-all ${
                          isSelected && enabled
                            ? "border-brand bg-brand/15 text-brand font-semibold"
                            : "border-theme bg-surface-elevated/40 text-theme-muted hover:text-ink disabled:opacity-40"
                        }`}
                      >
                        <span className="truncate">{mv.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tempo / Playback Speed */}
              <div>
                <label className="mb-2 block font-medium uppercase tracking-wider text-theme-muted text-[11px]">
                  Dance Tempo & Speed
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {SPEED_OPTIONS.map((spd) => {
                    const isSelected = Math.abs(speed - spd.value) < 0.05;
                    return (
                      <button
                        key={spd.value}
                        disabled={!enabled}
                        onClick={() => setSpeed(spd.value)}
                        className={`rounded-lg border py-1.5 text-center text-[11px] transition-all ${
                          isSelected && enabled
                            ? "border-brand bg-brand/15 text-brand font-semibold"
                            : "border-theme bg-surface-elevated/40 text-theme-muted hover:text-ink disabled:opacity-40"
                        }`}
                      >
                        {spd.label.split(" ")[0]}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer Tip */}
            <div className="mt-4 pt-3 border-t border-theme flex items-center justify-between text-[11px] text-theme-muted">
              <span>Interactive Mouse Tilt Active</span>
              <span className="font-mono text-brand">29-DOF Humanoid</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
