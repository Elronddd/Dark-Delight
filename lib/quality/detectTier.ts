import type { QualityTier } from "./tiers";

/** One-time static heuristic — cheap, no WebGL renderer-string sniffing (unreliable/masked by browsers). */
export function detectStaticTier(): QualityTier {
  if (typeof window === "undefined") return "medium";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "low";

  const cores = navigator.hardwareConcurrency ?? 4;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const narrowViewport = window.innerWidth < 768;

  if (cores >= 8 && !(coarsePointer && narrowViewport)) return "high";
  if (cores >= 4) return "medium";
  return "low";
}

export function downgrade(tier: QualityTier): QualityTier {
  if (tier === "high") return "medium";
  if (tier === "medium") return "low";
  return "low";
}
