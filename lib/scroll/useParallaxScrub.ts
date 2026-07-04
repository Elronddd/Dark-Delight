"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/utils/viewport";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scrubs a target's yPercent against its own scroll progress — a cheap depth
 * cue for background glows/panels that should drift slower than the page
 * scrolls. Factored out of ReservationCTA so other sections can reuse the
 * same "ambient background parallax" technique instead of re-deriving it.
 */
export function useParallaxScrub<T extends HTMLElement>(
  ref: RefObject<T | null>,
  amount = 20,
  enabled = true
) {
  useEffect(() => {
    if (!enabled || !ref.current) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        yPercent: amount,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, ref);

    return () => ctx.revert();
  }, [ref, amount, enabled]);
}
