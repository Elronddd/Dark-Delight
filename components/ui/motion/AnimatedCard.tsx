"use client";

import { useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { getPointerNormalized } from "@/lib/utils/mouse";
import { SPRING_CARD_HOVER, SPRING_CARD_TILT } from "@/lib/animations/transitions";
import { HOVER_SCALE_SM } from "@/lib/animations/variants";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Max tilt in degrees at the edge of the card. */
  tiltRange?: number;
  /** CSS color for the pointer-follow glow. */
  glowColor?: string;
};

/**
 * Generic pointer-tilt card: rotates toward the cursor with a soft glow
 * following it, springs back on leave. The drop shadow shifts opposite the
 * tilt, as if cast by a fixed light source, instead of sitting static.
 */
export default function AnimatedCard({
  children,
  className = "",
  tiltRange = 10,
  glowColor = "rgba(148,75,75,.35)",
}: Props) {
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tiltRange, -tiltRange]), SPRING_CARD_TILT);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tiltRange, tiltRange]), SPRING_CARD_TILT);
  const glowX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(y, [-0.5, 0.5], [0, 100]);
  const glow = useMotionTemplate`radial-gradient(220px circle at ${glowX}% ${glowY}%, ${glowColor}, transparent 70%)`;

  const shadowX = useSpring(useTransform(x, [-0.5, 0.5], [16, -16]), SPRING_CARD_TILT);
  const shadowY = useSpring(useTransform(y, [-0.5, 0.5], [10, 24]), SPRING_CARD_TILT);
  const shadowAlpha = useSpring(hovered ? 0.55 : 0, SPRING_CARD_TILT);
  const shadow = useMotionTemplate`${shadowX}px ${shadowY}px 40px -16px rgba(0,0,0,${shadowAlpha})`;

  return (
    <motion.div
      data-cursor-hover
      onPointerMove={(e) => {
        const { x: nx, y: ny } = getPointerNormalized(e, e.currentTarget);
        x.set(nx);
        y.set(ny);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ ...HOVER_SCALE_SM, y: -5 }}
      transition={SPRING_CARD_HOVER}
      style={{ rotateX, rotateY, transformPerspective: 800, boxShadow: shadow }}
      className={`group relative overflow-hidden ${className}`}
    >
      <motion.div
        style={{ background: glow }}
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      {children}
    </motion.div>
  );
}
