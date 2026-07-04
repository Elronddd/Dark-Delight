import type { QualityTier } from "./tiers";
import { BREAKPOINTS } from "@/lib/constants";
import { prefersReducedMotion, isCoarsePointer } from "@/lib/utils/viewport";

/** One-time static heuristic — cheap, no WebGL renderer-string sniffing (unreliable/masked by browsers). */
export function detectStaticTier(): QualityTier {
  if (typeof window === "undefined") return "medium";

  if (prefersReducedMotion()) return "low";

  const cores = navigator.hardwareConcurrency ?? 4;
  const narrowViewport = window.innerWidth < BREAKPOINTS.md;

  if (cores >= 8 && !(isCoarsePointer() && narrowViewport)) return "high";
  if (cores >= 4) return "medium";
  return "low";
}

export function downgrade(tier: QualityTier): QualityTier {
  if (tier === "high") return "medium";
  if (tier === "medium") return "low";
  return "low";
}
