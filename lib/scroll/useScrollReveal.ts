"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE_OUT_SOFT } from "@/lib/animations/easing";
import { DURATION } from "@/lib/constants";
import { prefersReducedMotion } from "@/lib/utils/viewport";

gsap.registerPlugin(ScrollTrigger);

/**
 * Named reveal recipes so each section can pick a distinct entrance instead
 * of every section using the same fade-up — "fade" is the original/default:
 * - mask: clip-path curtain wipe (doubles as a text "line reveal")
 * - slide-left / slide-right: horizontal drift + blur
 * - scale: soft pop from 0.92 + blur, for stat/chip-like content
 */
export type RevealVariant = "fade" | "mask" | "slide-left" | "slide-right" | "scale";

type RevealOptions = {
  y?: number;
  stagger?: number;
  variant?: RevealVariant;
  /** Alternates +/- this many degrees per target index — a "layered" stagger for grids/cards. */
  rotate?: number;
};

function buildKeyframes(options: RevealOptions | undefined) {
  const distance = options?.y ?? 32;
  const from: Record<string, unknown> = { opacity: 0 };
  const to: Record<string, unknown> = { opacity: 1 };

  switch (options?.variant) {
    case "mask":
      from.clipPath = "inset(0 0 100% 0)";
      to.clipPath = "inset(0 0 0% 0)";
      break;
    case "slide-left":
      from.x = -distance;
      from.filter = "blur(6px)";
      to.x = 0;
      to.filter = "blur(0px)";
      break;
    case "slide-right":
      from.x = distance;
      from.filter = "blur(6px)";
      to.x = 0;
      to.filter = "blur(0px)";
      break;
    case "scale":
      from.scale = 0.92;
      from.filter = "blur(4px)";
      to.scale = 1;
      to.filter = "blur(0px)";
      break;
    case "fade":
    default:
      from.y = distance;
      from.filter = "blur(6px)";
      to.y = 0;
      to.filter = "blur(0px)";
      break;
  }

  if (options?.rotate) {
    const deg = options.rotate;
    from.rotate = (i: number) => (i % 2 === 0 ? -deg : deg);
    to.rotate = 0;
  }

  return { from, to };
}

/** Reveals children into place as the section scrolls into view, using one of RevealVariant's recipes. */
export function useScrollReveal<T extends HTMLElement>(options?: RevealOptions) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Respect reduced-motion: show content immediately, skip the tween entirely
    // rather than leaving it stuck at opacity:0 if a trigger never fires.
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const targets = ref.current!.querySelectorAll("[data-reveal]");
      const { from, to } = buildKeyframes(options);

      gsap.fromTo(targets.length ? targets : ref.current, from, {
        ...to,
        duration: DURATION.reveal,
        ease: EASE_OUT_SOFT,
        stagger: options?.stagger ?? 0.12,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
      });
    }, ref);

    return () => ctx.revert();
    // Depend on the individual primitives actually read (via buildKeyframes),
    // not the `options` object itself — callers pass a fresh literal each
    // render, which would otherwise re-run this effect every time.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options?.y, options?.stagger, options?.variant, options?.rotate]);

  return ref;
}
