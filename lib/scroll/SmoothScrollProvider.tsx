"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Shared instance so components outside this provider (e.g. a hero "scroll" cue) can call scrollTo(). */
export let lenisInstance: Lenis | null = null;

export function scrollToTarget(target: string | number | HTMLElement) {
  if (lenisInstance) lenisInstance.scrollTo(target);
  else document.querySelector(String(target))?.scrollIntoView({ behavior: "smooth" });
}

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Respect reduced-motion: skip Lenis entirely, use native scroll.
      return;
    }

    const lenis = new Lenis({
      duration: 0.9,
      smoothWheel: true,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    });
    lenisInstance = lenis;

    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return <>{children}</>;
}
