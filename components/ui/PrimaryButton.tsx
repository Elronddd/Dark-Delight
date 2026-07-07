"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { getPointerPercent } from "@/lib/utils/mouse";
import { SPRING_BUTTON_PRIMARY, SPRING_BUTTON_TAP, SPRING_GLOW_FOLLOW } from "@/lib/animations/transitions";
import { HOVER_SCALE_MD, TAP_SCALE_MD } from "@/lib/animations/variants";
import type { MotionSafeButtonProps } from "@/lib/animations/types";

/**
 * Solid rose-fill CTA: spring hover/tap and a cursor-tracked radial
 * highlight. No magnetic pull (removed per feedback) and no shine-sweep
 * animation (a moving light-sweep across a button was explicitly rejected
 * on a prior project) — see memory.
 */
export default function PrimaryButton({ children, className = "", ...props }: MotionSafeButtonProps) {
  const rawGlowX = useMotionValue(50);
  const rawGlowY = useMotionValue(50);
  const glowX = useSpring(rawGlowX, SPRING_GLOW_FOLLOW);
  const glowY = useSpring(rawGlowY, SPRING_GLOW_FOLLOW);
  const glow = useMotionTemplate`radial-gradient(160px circle at ${glowX}% ${glowY}%, rgba(245,234,230,.35), transparent 70%)`;

  return (
    <motion.button
      data-cursor-hover
      whileHover={{ ...HOVER_SCALE_MD, transition: SPRING_BUTTON_PRIMARY }}
      whileTap={{ ...TAP_SCALE_MD, transition: SPRING_BUTTON_TAP }}
      onMouseMove={(e) => {
        const { x, y } = getPointerPercent(e, e.currentTarget);
        rawGlowX.set(x);
        rawGlowY.set(y);
      }}
      className={`group relative overflow-hidden rounded-full bg-rose px-7 py-3 text-cream shadow-[0_10px_30px_-12px_rgba(148,75,75,0.55)] ${className}`}
      {...props}
    >
      <motion.div style={{ background: glow }} className="absolute inset-0" />
      <div className="absolute -inset-px rounded-full border border-blush/20" />
      <span className="relative z-10 font-semibold tracking-wide">{children}</span>
    </motion.button>
  );
}
