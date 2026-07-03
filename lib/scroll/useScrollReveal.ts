"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Fades/slides children up into place as the section scrolls into view. */
export function useScrollReveal<T extends HTMLElement>(options?: { y?: number; stagger?: number }) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Respect reduced-motion: show content immediately, skip the tween entirely
    // rather than leaving it stuck at opacity:0 if a trigger never fires.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const targets = ref.current!.querySelectorAll("[data-reveal]");
      gsap.fromTo(
        targets.length ? targets : ref.current,
        { opacity: 0, y: options?.y ?? 32 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: options?.stagger ?? 0.12,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [options?.y, options?.stagger]);

  return ref;
}
