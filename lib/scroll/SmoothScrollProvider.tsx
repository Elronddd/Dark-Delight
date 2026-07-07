"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { easeOutCubic } from "@/lib/animations/easing";
import { rafThrottle } from "@/lib/utils/performance";
import { prefersReducedMotion } from "@/lib/utils/viewport";
import { useAppStore } from "@/lib/store/useAppStore";

gsap.registerPlugin(ScrollTrigger);

/** Shared instance so components outside this provider (e.g. a hero "scroll" cue) can call scrollTo(). */
export let lenisInstance: Lenis | null = null;

export function scrollToTarget(target: string | number | HTMLElement) {
  if (lenisInstance) lenisInstance.scrollTo(target);
  else document.querySelector(String(target))?.scrollIntoView({ behavior: "smooth" });
}

const NAVBAR_SOLID_THRESHOLD = 80;

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  // The one shared scroll listener for the app — consumers (Navbar, etc.)
  // read `isScrolled` from the store instead of adding their own listener.
  // Runs regardless of Lenis/reduced-motion, since the real window still
  // fires native scroll events whether or not Lenis is animating it.
  useEffect(() => {
    const setIsScrolled = useAppStore.getState().setIsScrolled;
    const onScroll = rafThrottle(() => {
      setIsScrolled(window.scrollY > NAVBAR_SOLID_THRESHOLD);
    });
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) {
      // Respect reduced-motion: skip Lenis entirely, use native scroll.
      return;
    }

    const lenis = new Lenis({ duration: 1.0, smoothWheel: true, easing: easeOutCubic });
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
