"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import React from "react";

type Props = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onAnimationStart" | "onAnimationEnd" | "onDrag" | "onDragStart" | "onDragEnd"
> & {
  children: React.ReactNode;
};

export default function NeonButton({ children, className = "", ...props }: Props) {
  const x = useMotionValue(50);
  const y = useMotionValue(50);
  const bg = useMotionTemplate`radial-gradient(180px circle at ${x}% ${y}%, rgba(232,130,30,.35), transparent 70%)`;

  return (
    <motion.button
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.98, y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(((e.clientX - r.left) / r.width) * 100);
        y.set(((e.clientY - r.top) / r.height) * 100);
      }}
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
