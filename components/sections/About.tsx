"use client";

import { useRef } from "react";
import AnimatedSection from "@/components/ui/motion/AnimatedSection";
import AnimatedHeading from "@/components/ui/motion/AnimatedHeading";
import AnimatedImage from "@/components/ui/motion/AnimatedImage";
import { useParallaxScrub } from "@/lib/scroll/useParallaxScrub";

const panels = [
  { label: "The Counter", src: "/photos/real/bar-neon-shelving.webp", alt: "Illuminated bar shelving at Dark Delight" },
  { label: "The Tandoor", src: "/photos/real/tandoori-chicken.webp", alt: "Tandoori chicken fresh from the grill" },
  { label: "The Corner Table", src: "/photos/real/dining-area.webp", alt: "A quiet dining corner at Dark Delight" },
];

export default function About() {
  const glowRef = useRef<HTMLDivElement>(null);
  useParallaxScrub(glowRef, 15);

  return (
    <section className="relative overflow-hidden mx-auto max-w-6xl px-6 py-32 md:px-10">
      <div
        ref={glowRef}
        aria-hidden
        className="grain pointer-events-none absolute inset-0 opacity-50"
        style={{ background: "radial-gradient(45% 55% at 15% 20%, rgba(221,186,186,0.12), transparent 70%)" }}
      />
      <AnimatedSection variant="slide-left" className="relative grid gap-16 md:grid-cols-2 md:items-center">
        <div>
          <p className="eyebrow mb-5" data-reveal>Our Story</p>
          <AnimatedHeading
            as="h2"
            className="font-display text-3xl uppercase leading-tight text-cream md:text-4xl"
            text="Rich, Slow, Unhurried"
          />
          <p className="mt-6 max-w-md text-cream/70" data-reveal>
            Good food, good company, and a room that lets an evening take its time — that&apos;s Dark Delight.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {panels.map((panel, i) => (
            <AnimatedImage
              key={panel.label}
              className={`rounded-2xl ${i === 0 ? "col-span-3 aspect-[16/9]" : "aspect-square"}`}
              innerClassName="grain bg-ink"
              src={panel.src}
              alt={panel.alt}
              hoverTilt
            >
              <span className="absolute bottom-3 left-3 eyebrow text-cream/60">{panel.label}</span>
            </AnimatedImage>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}
