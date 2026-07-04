/** GSAP ease-string constants — the exact values already in use across the
 * scroll-reveal / heading / panel animations, centralized so future
 * animations pick from the same small, intentional set. */
export const EASE_OUT_SOFT = "power3.out";
export const EASE_OUT_STRONG = "power4.out";
export const EASE_IN_OUT_STRONG = "power4.inOut";

/** Numeric cubic ease-out — for consumers (like Lenis) that take a plain
 * function rather than a GSAP ease string. */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/** Cubic-bezier array for Framer Motion transitions (which don't accept GSAP
 * ease strings). Matches the same curve already used by globals.css's
 * `.enter-fade-up` keyframe, so GSAP- and Framer-driven entrances feel identical. */
export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
