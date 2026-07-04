"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ShinyButton from "@/components/ui/ShinyButton";
import SplitHeading from "@/components/ui/SplitHeading";
import { useScrollReveal } from "@/lib/scroll/useScrollReveal";
import { business } from "@/content/business";

gsap.registerPlugin(ScrollTrigger);

export default function ReservationCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const contentRef = useScrollReveal<HTMLDivElement>();

  useEffect(() => {
    if (!sectionRef.current || !glowRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Background glow drifts slower than the page scrolls — cheap depth cue.
      gsap.to(glowRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
      <div ref={contentRef} className="relative mx-auto max-w-3xl px-6 text-center md:px-10">
        <p className="eyebrow mb-4" data-reveal>Reserve Your Experience</p>
        <SplitHeading as="h2" className="font-display text-4xl text-cream md:text-5xl" text="Book Your Table Now" />
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
      </div>
    </section>
  );
}
