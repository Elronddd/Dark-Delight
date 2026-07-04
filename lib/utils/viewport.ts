/** Shared media-query checks — previously each re-implemented inline in
 * several components (useScrollReveal, AnimatedHeading, AnimatedImage,
 * ReservationCTA, CustomCursor, SmoothScrollProvider, detectTier). */

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function hasFinePointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: fine)").matches;
}

export function isCoarsePointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
}
