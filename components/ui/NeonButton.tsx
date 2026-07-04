"use client";

import type React from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useMagnetic } from "@/lib/useMagnetic";
import { getPointerPercent } from "@/lib/utils/mouse";
import { SPRING_BUTTON_PRIMARY, SPRING_BUTTON_TAP, SPRING_GLOW_FOLLOW } from "@/lib/animations/transitions";
import { HOVER_SCALE_MD, TAP_SCALE_MD } from "@/lib/animations/variants";
import type { MotionSafeButtonProps } from "@/lib/animations/types";

export default function NeonButton({ children, className = "", ...props }: MotionSafeButtonProps) {
  const rawGlowX = useMotionValue(50);
  const rawGlowY = useMotionValue(50);
  const glowX = useSpring(rawGlowX, SPRING_GLOW_FOLLOW);
  const glowY = useSpring(rawGlowY, SPRING_GLOW_FOLLOW);
  const bg = useMotionTemplate`radial-gradient(180px circle at ${glowX}% ${glowY}%, rgba(232,130,30,.35), transparent 70%)`;
  const magnetic = useMagnetic(0.3);

  return (
    <motion.button
      ref={magnetic.ref as React.Ref<HTMLButtonElement>}
      data-cursor-hover
      style={{ x: magnetic.x, y: magnetic.y }}
      whileHover={{ ...HOVER_SCALE_MD, transition: SPRING_BUTTON_PRIMARY }}
      whileTap={{ ...TAP_SCALE_MD, transition: SPRING_BUTTON_TAP }}
      onMouseMove={(e) => {
        const { x, y } = getPointerPercent(e, e.currentTarget);
        rawGlowX.set(x);
        rawGlowY.set(y);
        magnetic.onMouseMove(e);
      }}
      onMouseLeave={magnetic.onMouseLeave}
      className={`group relative overflow-hidden rounded-2xl border border-ember/30 bg-espresso px-6 py-3 text-cream shadow-[0_0_0_1px_rgba(255,255,255,.02)] ${className}`}
      {...props}
    >
      <motion.div
        style={{ background: bg }}
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "linear-gradient(90deg,#E8821E,#F2B15A,#E8821E)",
          filter: "blur(10px)",
        }}
      />
      <div className="absolute inset-0 rounded-2xl border border-ember/10 group-hover:border-ember/50 transition-colors" />
      <span className="relative z-10 font-semibold tracking-wide">{children}</span>
    </motion.button>
  );
}
