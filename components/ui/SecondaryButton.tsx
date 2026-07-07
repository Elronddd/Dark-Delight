"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { getPointerPercent } from "@/lib/utils/mouse";
import { SPRING_BUTTON_PRIMARY, SPRING_BUTTON_TAP, SPRING_GLOW_FOLLOW } from "@/lib/animations/transitions";
import { HOVER_SCALE_SM, TAP_SCALE_MD } from "@/lib/animations/variants";
import type { MotionSafeButtonProps } from "@/lib/animations/types";

/** Bordered/outline CTA — same cursor-glow mechanics as PrimaryButton, quieter fill, no magnetic pull. */
export default function SecondaryButton({ children, className = "", ...props }: MotionSafeButtonProps) {
  const rawGlowX = useMotionValue(50);
  const rawGlowY = useMotionValue(50);
  const glowX = useSpring(rawGlowX, SPRING_GLOW_FOLLOW);
  const glowY = useSpring(rawGlowY, SPRING_GLOW_FOLLOW);
  const glow = useMotionTemplate`radial-gradient(150px circle at ${glowX}% ${glowY}%, rgba(221,186,186,.16), transparent 70%)`;

  return (
    <motion.button
      data-cursor-hover
      whileHover={{ ...HOVER_SCALE_SM, transition: SPRING_BUTTON_PRIMARY }}
      whileTap={{ ...TAP_SCALE_MD, transition: SPRING_BUTTON_TAP }}
      onMouseMove={(e) => {
        const { x, y } = getPointerPercent(e, e.currentTarget);
        rawGlowX.set(x);
        rawGlowY.set(y);
      }}
      className={`group relative overflow-hidden rounded-full border border-blush/25 bg-surface/60 px-7 py-3 text-cream ${className}`}
      {...props}
    >
      <motion.div style={{ background: glow }} className="absolute inset-0" />
      <div className="absolute inset-0 rounded-full border border-blush/0 transition-colors duration-300 group-hover:border-blush/40" />
      <span className="relative z-10 font-semibold tracking-wide">{children}</span>
    </motion.button>
  );
}
