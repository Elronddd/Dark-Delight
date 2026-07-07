"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import PrimaryButton from "@/components/ui/PrimaryButton";
import AnimatedSection from "@/components/ui/motion/AnimatedSection";
import AnimatedHeading from "@/components/ui/motion/AnimatedHeading";
import { useParallaxScrub } from "@/lib/scroll/useParallaxScrub";
import { business } from "@/content/business";

export default function ReservationCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // GSAP only ever touches this element's `transform`; the breathing opacity
  // below is Framer-driven, so the two never fight over one property.
  useParallaxScrub(glowRef, 20);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-ink py-32">
      <motion.div
        ref={glowRef}
        aria-hidden
        className="grain absolute inset-0"
        style={{ background: "radial-gradient(50% 60% at 50% 50%, rgba(148,75,75,0.2), transparent 70%)" }}
        animate={{ opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <AnimatedSection className="relative mx-auto max-w-3xl px-6 text-center md:px-10">
        <p className="eyebrow mb-4" data-reveal>Reserve Your Experience</p>
        <AnimatedHeading as="h2" className="font-display text-3xl uppercase text-cream md:text-4xl" text="Book Your Table Now" />
        <p className="mt-4 text-cream/70" data-reveal>
          Good food brings people together. We can&apos;t wait to welcome you.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4" data-reveal>
          <Link href="/reservations">
            <PrimaryButton>Reserve a Table</PrimaryButton>
          </Link>
          <a href={business.phoneHref} data-cursor-hover className="eyebrow text-cream/70 hover:text-blush">
            or call {business.phone}
          </a>
        </div>
      </AnimatedSection>
    </section>
  );
}
