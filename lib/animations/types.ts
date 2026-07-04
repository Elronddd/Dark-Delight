import type React from "react";

/** Shared prop type for motion.button wrappers — Framer Motion's event
 * handler types conflict with the native ones on a few event names, so
 * they're omitted once here instead of in every button component. */
export type MotionSafeButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onAnimationStart" | "onAnimationEnd" | "onDrag" | "onDragStart" | "onDragEnd"
> & {
  children: React.ReactNode;
};
