import type { Variants } from "framer-motion";
import { EASE_OUT_EXPO } from "./easing";

/** Named hover/tap scale values — the exact figures already in use, just
 * given names so future components pick a consistent scale instead of a
 * new arbitrary number each time. */
export const HOVER_SCALE_SM = { scale: 1.03 };
export const HOVER_SCALE_MD = { scale: 1.04 };
export const HOVER_SCALE_LG = { scale: 1.05 };
export const TAP_SCALE_MD = { scale: 0.96 };
export const TAP_SCALE_LG = { scale: 0.95 };

/** Generic fade-up variant for simple mount-triggered reveals (AnimatedContainer). */
export const FADE_UP_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

/** Hero entrance: staggers its direct children (see HERO_ITEM_VARIANTS) so
 * eyebrow/paragraph/CTAs cascade in rather than arriving as one flat block. */
export const HERO_STAGGER_CONTAINER: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16, delayChildren: 0.5 } },
};

/** Depth via blur+opacity+lift, matching the curve already used by the
 * server-rendered `.enter-fade-up` CSS keyframe (globals.css). */
export const HERO_ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE_OUT_EXPO },
  },
};
