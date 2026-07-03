"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import React from "react";

type Props = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onAnimationStart" | "onAnimationEnd" | "onDrag" | "onDragStart" | "onDragEnd"
> & {
  children: React.ReactNode;
};

export default function ShinyButton({ children, className = "", ...props }: Props) {
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const shine = useMotionTemplate`radial-gradient(140px circle at ${mx}% ${my}%, rgba(255,255,255,.28), transparent 65%)`;

  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 100);
        my.set(((e.clientY - r.top) / r.height) * 100);
      }}
      className={`group relative overflow-hidden rounded-full px-7 py-3 bg-ember border border-ember-deep/40 text-ink ${className}`}
      {...props}
    >
      <motion.div className="absolute inset-0" style={{ background: shine }} />
      <motion.div
        animate={{ x: ["-160%", "220%"] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
        className="absolute inset-y-0 w-20 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent"
      />
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/15 to-transparent" />
      <div className="absolute -inset-px rounded-full opacity-0 group-hover:opacity-100 blur-md transition bg-gradient-to-r from-ember-deep via-ember to-ember-deep" />
      <span className="relative z-10 font-semibold">{children}</span>
    </motion.button>
  );
}
