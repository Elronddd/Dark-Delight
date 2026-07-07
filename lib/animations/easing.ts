/** GSAP ease-string constants. Softer curves than a typical snappy-brand
 * site — this palette's "elegant, rich, warm, luxurious" brief calls for
 * more languid deceleration, not punchy energy. */
export const EASE_OUT_SOFT = "power2.out";
export const EASE_OUT_VELVET = "power3.out";
export const EASE_IN_OUT_SILK = "power4.inOut";

/** Numeric cubic ease-out — for consumers (like Lenis) that take a plain function. */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/** Cubic-bezier array for Framer Motion transitions (which don't accept GSAP ease strings). */
export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
