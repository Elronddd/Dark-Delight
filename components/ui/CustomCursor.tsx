"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { hasFinePointer, prefersReducedMotion } from "@/lib/utils/viewport";
import { SPRING_CURSOR_FOLLOW, SPRING_CURSOR_RING } from "@/lib/animations/transitions";

/**
 * Site-wide magnetic cursor: a tight dot plus a lagging ring that scales up
 * over anything marked data-cursor-hover. Disabled on touch/coarse-pointer
 * devices and reduced-motion.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [dragLabel, setDragLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, SPRING_CURSOR_FOLLOW);
  const ringY = useSpring(y, SPRING_CURSOR_FOLLOW);

  useEffect(() => {
    setEnabled(hasFinePointer() && !prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
      const target = e.target as HTMLElement;
      const dragZone = target.closest("[data-cursor-drag]");
      setHovering(Boolean(dragZone || target.closest("[data-cursor-hover]")));
      setDragLabel(dragZone ? dragZone.getAttribute("data-cursor-drag") || "Drag" : null);
    };
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [enabled, visible, x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[200]" style={{ opacity: visible ? 1 : 0 }}>
      <motion.div
        style={{ left: x, top: y }}
        animate={{ opacity: dragLabel ? 0 : 1 }}
        className="fixed h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blush"
      />
      <motion.div
        style={{ left: ringX, top: ringY }}
        animate={{
          width: dragLabel ? 78 : hovering ? 54 : 32,
          height: dragLabel ? 78 : hovering ? 54 : 32,
          opacity: hovering ? 0.9 : 0.45,
        }}
        transition={SPRING_CURSOR_RING}
        className="fixed flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-blush mix-blend-difference"
      >
        {dragLabel && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="eyebrow whitespace-nowrap text-[10px] text-cream"
          >
            {dragLabel}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}
