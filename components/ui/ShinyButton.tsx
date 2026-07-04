"use client";

import type React from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useMagnetic } from "@/lib/useMagnetic";
import { getPointerPercent } from "@/lib/utils/mouse";
import { SPRING_BUTTON_SECONDARY, SPRING_BUTTON_TAP, SPRING_GLOW_FOLLOW } from "@/lib/animations/transitions";
import { HOVER_SCALE_LG, TAP_SCALE_LG } from "@/lib/animations/variants";
import { DURATION } from "@/lib/constants";
import type { MotionSafeButtonProps } from "@/lib/animations/types";

export default function ShinyButton({ children, className = "", ...props }: MotionSafeButtonProps) {
  const rawMx = useMotionValue(50);
  const rawMy = useMotionValue(50);
  const mx = useSpring(rawMx, SPRING_GLOW_FOLLOW);
  const my = useSpring(rawMy, SPRING_GLOW_FOLLOW);
  const shine = useMotionTemplate`radial-gradient(140px circle at ${mx}% ${my}%, rgba(255,255,255,.28), transparent 65%)`;
  const magnetic = useMagnetic(0.3);

  return (
    <motion.button
      ref={magnetic.ref as React.Ref<HTMLButtonElement>}
      data-cursor-hover
      style={{ x: magnetic.x, y: magnetic.y }}
      whileHover={{ ...HOVER_SCALE_LG, transition: SPRING_BUTTON_SECONDARY }}
      whileTap={{ ...TAP_SCALE_LG, transition: SPRING_BUTTON_TAP }}
      onMouseMove={(e) => {
        const { x, y } = getPointerPercent(e, e.currentTarget);
        rawMx.set(x);
        rawMy.set(y);
        magnetic.onMouseMove(e);
      }}
      onMouseLeave={magnetic.onMouseLeave}
      className={`group relative overflow-hidden rounded-full px-7 py-3 bg-ember border border-ember-deep/40 text-ink ${className}`}
      {...props}
    >
      <motion.div className="absolute inset-0" style={{ background: shine }} />
      <motion.div
        animate={{ x: ["-160%", "220%"] }}
        transition={{ duration: DURATION.shineLoop, repeat: Infinity, ease: "linear" }}
        className="absolute inset-y-0 w-20 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent"
      />
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/15 to-transparent" />
      <div className="absolute -inset-px rounded-full opacity-0 group-hover:opacity-100 blur-md transition bg-gradient-to-r from-ember-deep via-ember to-ember-deep" />
      <span className="relative z-10 font-semibold">{children}</span>
    </motion.button>
  );
}
