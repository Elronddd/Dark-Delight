/**
 * Central design tokens. Values here document/mirror the Tailwind classes
 * and animation figures already used throughout the project — this file is
 * the reference for anything expressed as a JS number (durations, the
 * breakpoint used in quality-tier detection) and a documented map for
 * anything still authored as Tailwind classes (spacing/shadows/radius/
 * z-index/blur), so new work has one place to check the existing scale
 * instead of picking a new arbitrary value.
 */
import { EASE_OUT_SOFT, EASE_OUT_STRONG, EASE_IN_OUT_STRONG } from "./animations/easing";

/** Animation durations, in seconds, as already used by GSAP/Framer Motion tweens. */
export const DURATION = {
  fast: 0.3, // Navbar's background/padding transition (Tailwind duration-300)
  base: 0.9, // AnimatedHeading word reveal, .enter-fade-up
  reveal: 1, // useScrollReveal's fade/slide-up
  slow: 1.1, // AnimatedImage clip-path wipe
  slower: 1.6, // AnimatedImage Ken Burns zoom
  shineLoop: 2.4, // ShinyButton's looping shine sweep
} as const;

/** Re-exported so call sites can import one durations+easing set from `lib/constants`. */
export const EASING = {
  soft: EASE_OUT_SOFT,
  strong: EASE_OUT_STRONG,
  strongInOut: EASE_IN_OUT_STRONG,
} as const;

/** Section/vertical rhythm already used via Tailwind classes (py-28 etc). Reference only. */
export const SPACING = {
  sectionY: "7rem", // py-28
  cardGap: "1.5rem", // gap-6
} as const;

/** Custom shadow values used via Tailwind arbitrary-value classes. Reference only. */
export const SHADOWS = {
  buttonHairline: "0 0 0 1px rgba(255,255,255,.02)", // NeonButton's shadow-[...]
} as const;

/** Border radius scale used via Tailwind classes (rounded-2xl/3xl/full). Reference only. */
export const RADIUS = {
  md: "1rem", // rounded-2xl
  lg: "1.5rem", // rounded-3xl
  full: "9999px",
} as const;

/** Mirrors Tailwind's default breakpoints — used where JS needs the same
 * threshold Tailwind's `md:` etc already encode (e.g. quality-tier detection). */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

/** Stacking scale already expressed via Tailwind z-* classes. Reference only. */
export const Z_INDEX = {
  stickyFilterBar: 30, // MenuClient's filter bar
  navbar: 50,
  skipLink: 100,
  cursor: 200,
} as const;

/** Blur scale used via Tailwind classes (backdrop-blur-md, blur-md) and inline filters. Reference only. */
export const BLUR = {
  sm: "4px",
  md: "12px", // backdrop-blur-md / blur-md
  buttonGlow: "10px", // NeonButton's gradient-border filter: blur(10px)
} as const;
