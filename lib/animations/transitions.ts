import type { Transition, SpringOptions } from "framer-motion";

/** Named Framer Motion transitions. Lower stiffness / higher damping than a
 * snappy-brand default — reads as weighted and deliberate ("velvet"), which
 * suits an elegant/rich/luxurious direction better than punchy energy. */

export const SPRING_BUTTON_PRIMARY: Transition = { type: "spring", stiffness: 260, damping: 26 };
export const SPRING_BUTTON_TAP: Transition = { type: "spring", stiffness: 420, damping: 20 };
export const SPRING_CARD_HOVER: Transition = { type: "spring", stiffness: 220, damping: 24 };
export const SPRING_CURSOR_RING: Transition = { type: "spring", stiffness: 260, damping: 28 };
export const SPRING_NAV_INDICATOR: Transition = { type: "spring", stiffness: 320, damping: 32 };

/** SpringOptions (for useSpring) rather than a Transition (for whileHover/animate). */
export const SPRING_CARD_TILT: SpringOptions = { stiffness: 160, damping: 22 };
export const SPRING_CURSOR_FOLLOW: SpringOptions = { stiffness: 260, damping: 32, mass: 0.6 };
export const SPRING_GLOW_FOLLOW: SpringOptions = { stiffness: 220, damping: 28 };
