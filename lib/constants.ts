/**
 * Central design tokens — durations/easing plus a reference map for the
 * Tailwind-class-driven scales (spacing/radius/z-index/blur), so new work has
 * one place to check the existing scale instead of picking arbitrary values.
 */
import { EASE_OUT_SOFT, EASE_OUT_VELVET, EASE_IN_OUT_SILK } from "./animations/easing";

/** Animation durations, in seconds. Slightly longer than a snappy-brand
 * default — this direction is "rich/warm/luxurious", which reads better with
 * more languid pacing than punchy energy. */
export const DURATION = {
  fast: 0.35,
  base: 1.0,
  reveal: 1.1,
  slow: 1.2,
  slower: 1.8,
} as const;

export const EASING = {
  soft: EASE_OUT_SOFT,
  velvet: EASE_OUT_VELVET,
  silk: EASE_IN_OUT_SILK,
} as const;

export const SPACING = {
  sectionY: "8rem", // py-32
  cardGap: "1.5rem", // gap-6
} as const;

export const RADIUS = {
  md: "1rem",
  lg: "1.5rem",
  full: "9999px",
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

export const Z_INDEX = {
  stickyFilterBar: 30,
  navbar: 50,
  skipLink: 100,
  cursor: 200,
} as const;

export const BLUR = {
  sm: "4px",
  md: "12px",
} as const;
