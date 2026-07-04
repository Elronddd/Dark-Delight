"use client";

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
 * following it, springs back on leave. Generalized out of DishCard so any
 * future card can opt into the same interaction without re-deriving the
 * pointer math.
 */
export default function AnimatedCard({
  children,
  className = "",
  tiltRange = 12,
  glowColor = "rgba(232,130,30,.35)",
}: Props) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tiltRange, -tiltRange]), SPRING_CARD_TILT);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tiltRange, tiltRange]), SPRING_CARD_TILT);
  const glowX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(y, [-0.5, 0.5], [0, 100]);
  const glow = useMotionTemplate`radial-gradient(220px circle at ${glowX}% ${glowY}%, ${glowColor}, transparent 70%)`;

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
      whileHover={{ ...HOVER_SCALE_SM, y: -6 }}
      transition={SPRING_CARD_HOVER}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={`group relative overflow-hidden transition-shadow duration-300 hover:shadow-[0_24px_48px_-20px_rgba(0,0,0,0.55)] ${className}`}
    >
      <motion.div
        style={{ background: glow }}
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      {children}
    </motion.div>
  );
}
