"use client";

import { useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import { getPointerFromCenter } from "@/lib/utils/mouse";
import { SPRING_MAGNETIC } from "@/lib/animations/transitions";

/**
 * Real magnetic-button physics: the element physically translates toward the
 * cursor within a capture radius, springs back on leave. Pair with a ref on
 * the element and spread the returned handlers onto it.
 */
export function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING_MAGNETIC);
  const springY = useSpring(y, SPRING_MAGNETIC);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current) return;
    const { x: relX, y: relY } = getPointerFromCenter(e, ref.current);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, x: springX, y: springY, onMouseMove, onMouseLeave };
}
