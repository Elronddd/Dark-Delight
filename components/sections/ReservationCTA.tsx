"use client";

import { useRef } from "react";
import Link from "next/link";
import ShinyButton from "@/components/ui/ShinyButton";
import AnimatedSection from "@/components/ui/motion/AnimatedSection";
import AnimatedHeading from "@/components/ui/motion/AnimatedHeading";
import { useParallaxScrub } from "@/lib/scroll/useParallaxScrub";
import { business } from "@/content/business";

export default function ReservationCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Background glow drifts slower than the page scrolls — cheap depth cue.
  useParallaxScrub(glowRef, 20);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-ink py-28">
      <div
        ref={glowRef}
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          background: "radial-gradient(50% 60% at 50% 50%, rgba(232,130,30,0.18), transparent 70%)",
        }}
      />
      <AnimatedSection className="relative mx-auto max-w-3xl px-6 text-center md:px-10">
        <p className="eyebrow mb-4" data-reveal>Reserve Your Experience</p>
        <AnimatedHeading as="h2" className="font-display text-4xl text-cream md:text-5xl" text="Book Your Table Now" />
        <p className="mt-4 text-cream/70" data-reveal>
          Good food brings people together. We can&apos;t wait to welcome you.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4" data-reveal>
          <Link href="/reservations">
            <ShinyButton>Reserve a Table</ShinyButton>
          </Link>
          <a href={business.phoneHref} data-cursor-hover className="eyebrow text-cream/70 hover:text-ember">
            or call {business.phone}
          </a>
        </div>
      </AnimatedSection>
    </section>
  );
}
