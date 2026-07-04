"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import React from "react";
import { useMagnetic } from "@/lib/useMagnetic";

type Props = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onAnimationStart" | "onAnimationEnd" | "onDrag" | "onDragStart" | "onDragEnd"
> & {
  children: React.ReactNode;
};

export default function NeonButton({ children, className = "", ...props }: Props) {
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const bg = useMotionTemplate`radial-gradient(180px circle at ${glowX}% ${glowY}%, rgba(232,130,30,.35), transparent 70%)`;
  const magnetic = useMagnetic(0.3);

  return (
    <motion.button
      ref={magnetic.ref as React.Ref<HTMLButtonElement>}
      data-cursor-hover
      style={{ x: magnetic.x, y: magnetic.y }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        glowX.set(((e.clientX - r.left) / r.width) * 100);
        glowY.set(((e.clientY - r.top) / r.height) * 100);
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
