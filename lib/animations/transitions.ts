import type { Transition, SpringOptions } from "framer-motion";

/** Named Framer Motion transitions — the exact tuned values that were
 * previously inlined (and slightly duplicated) across NeonButton,
 * ShinyButton, DishCard, useMagnetic, and CustomCursor. Values are
 * unchanged from their original call sites; only the location moved. */

export const SPRING_BUTTON_PRIMARY: Transition = { type: "spring", stiffness: 350, damping: 22 };
export const SPRING_BUTTON_SECONDARY: Transition = { type: "spring", stiffness: 320, damping: 22 };
export const SPRING_CARD_HOVER: Transition = { type: "spring", stiffness: 260, damping: 20 };
export const SPRING_CURSOR_RING: Transition = { type: "spring", stiffness: 300, damping: 25 };

/** Crisper, lower-damping spring for the instant of a button press — distinct
 * from SPRING_BUTTON_PRIMARY/SECONDARY (used for the hover/release settle) so
 * the press itself reads as a quick, anticipatory snap rather than a slow ease. */
export const SPRING_BUTTON_TAP: Transition = { type: "spring", stiffness: 500, damping: 18 };

/** Active-route indicator under nav links — a `layout`/`layoutId` shared transition. */
export const SPRING_NAV_INDICATOR: Transition = { type: "spring", stiffness: 380, damping: 30 };

/** SpringOptions (for useSpring) rather than a Transition (for whileHover/animate). */
export const SPRING_CARD_TILT: SpringOptions = { stiffness: 200, damping: 20 };
export const SPRING_MAGNETIC: SpringOptions = { stiffness: 200, damping: 15, mass: 0.4 };
export const SPRING_CURSOR_FOLLOW: SpringOptions = { stiffness: 300, damping: 30, mass: 0.5 };
/** Smooths the cursor-follow glow on buttons/cards so it trails slightly
 * rather than snapping to the pointer instantly. */
export const SPRING_GLOW_FOLLOW: SpringOptions = { stiffness: 250, damping: 26, mass: 0.4 };
