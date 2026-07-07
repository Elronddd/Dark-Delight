import type { Variants } from "framer-motion";
import { EASE_OUT_EXPO } from "./easing";

/** Restrained hover/tap scales — a luxury direction reads as more expensive
 * with subtler movement, not bigger jumps. */
export const HOVER_SCALE_SM = { scale: 1.02 };
export const HOVER_SCALE_MD = { scale: 1.03 };
export const HOVER_SCALE_LG = { scale: 1.04 };
export const TAP_SCALE_MD = { scale: 0.97 };
export const TAP_SCALE_LG = { scale: 0.96 };

/** Generic fade-up variant for simple mount-triggered reveals. */
export const FADE_UP_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

/** Hero entrance: staggers its direct children. */
export const HERO_STAGGER_CONTAINER: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.5 } },
};

/** Depth via blur+opacity+lift. */
export const HERO_ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.0, ease: EASE_OUT_EXPO },
  },
};
