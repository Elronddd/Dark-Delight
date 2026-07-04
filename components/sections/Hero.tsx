"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import ShinyButton from "@/components/ui/ShinyButton";
import NeonButton from "@/components/ui/NeonButton";
import HeroCanvasLoader from "./HeroCanvasLoader";
import AnimatedHeading from "@/components/ui/motion/AnimatedHeading";
import { getPointerNormalized } from "@/lib/utils/mouse";
import { hasFinePointer, prefersReducedMotion } from "@/lib/utils/viewport";
import { HERO_STAGGER_CONTAINER, HERO_ITEM_VARIANTS } from "@/lib/animations/variants";
import { business } from "@/content/business";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [parallaxEnabled, setParallaxEnabled] = useState(false);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const springX = useSpring(px, { stiffness: 60, damping: 18, mass: 0.6 });
  const springY = useSpring(py, { stiffness: 60, damping: 18, mass: 0.6 });
  // Foreground copy drifts opposite the 3D cup's own cursor-parallax — a
  // cheap two-layer depth cue between the canvas and the real content.
  const contentX = useTransform(springX, (v) => v * -10);
  const contentY = useTransform(springY, (v) => v * -6);

  useEffect(() => {
    setParallaxEnabled(hasFinePointer() && !prefersReducedMotion());
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-ink"
      onMouseMove={(e) => {
        if (!parallaxEnabled || !sectionRef.current) return;
        const { x, y } = getPointerNormalized(e, sectionRef.current);
        px.set(x);
        py.set(y);
      }}
      onMouseLeave={() => {
        px.set(0);
        py.set(0);
      }}
    >
      <div aria-hidden className="absolute inset-0">
        <HeroCanvasLoader />
      </div>

      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32 md:px-10"
        // Idle "breathing" so the hero still feels alive with no cursor input —
        // auto-suppressed for prefers-reduced-motion via the app-wide MotionConfig.
        // Kept on its own element/transform, separate from the mouse-parallax
        // `style` below, since binding both an `animate` loop and a `style`
        // motion value to the same `y` on one element makes Framer fight
        // itself every frame (the exact cause of a reported stutter).
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div style={{ x: contentX, y: contentY }}>
          <motion.div
            className="max-w-xl"
            variants={HERO_STAGGER_CONTAINER}
            initial="hidden"
            animate="visible"
          >
            <motion.p variants={HERO_ITEM_VARIANTS} className="eyebrow mb-5">
              Patna · Bihar
            </motion.p>

            <AnimatedHeading
              as="h1"
              trigger="mount"
              delay={0.62}
              className="font-display text-6xl leading-[1.05] text-cream md:text-7xl"
              text={business.heroLine}
            />

            <motion.p
              variants={HERO_ITEM_VARIANTS}
              className="mt-6 max-w-md text-lg leading-relaxed text-cream/70"
            >
              {business.storyLine}
            </motion.p>

            <motion.div variants={HERO_ITEM_VARIANTS} className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/reservations">
                <ShinyButton>Reserve a Table</ShinyButton>
              </Link>
              <Link href="/menu">
                <NeonButton>View Menu</NeonButton>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        variants={HERO_ITEM_VARIANTS}
        initial="hidden"
        animate="visible"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center"
      >
        <p className="eyebrow mb-2">Scroll to Explore</p>
        <motion.svg
          viewBox="0 0 24 24"
          className="mx-auto h-4 w-4 text-gold"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.div>
    </section>
  );
}
