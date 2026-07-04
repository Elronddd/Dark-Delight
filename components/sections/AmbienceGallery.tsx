"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/motion/AnimatedSection";
import AnimatedHeading from "@/components/ui/motion/AnimatedHeading";
import AnimatedImage from "@/components/ui/motion/AnimatedImage";

const frames = [
  { label: "The Bar", tone: "from-ember/25 via-espresso to-ink" },
  { label: "Tandoor Smoke", tone: "from-ember-deep/40 via-espresso to-ink" },
  { label: "Evening Light", tone: "from-gold/20 via-espresso to-ink" },
  { label: "The Booths", tone: "from-ember/20 via-espresso to-ink" },
  { label: "Late Night", tone: "from-ember-deep/30 via-espresso to-ink" },
];

export default function AmbienceGallery() {
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative overflow-hidden bg-espresso/30 py-28">
      {/* Softens the hard color-cut to/from the neighboring bg-ink sections. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-ink/60 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-ink/60 to-transparent"
      />

      {/* Slow-drifting ambient bokeh — decorative only, hidden on small
          screens to avoid clutter/cost where there's less room to notice it. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-10 top-10 hidden h-64 w-64 rounded-full bg-ember/10 blur-3xl md:block"
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-0 hidden h-72 w-72 rounded-full bg-gold/10 blur-3xl md:block"
        animate={{ x: [0, -24, 0], y: [0, -16, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <AnimatedSection variant="slide-right" className="relative mx-auto mb-10 max-w-7xl px-6 text-center md:px-10">
        <p className="eyebrow mb-4" data-reveal>In the Neighbourhood</p>
        <AnimatedHeading as="h2" className="font-display text-4xl text-cream md:text-5xl" text="A Look Inside" />
        <p className="mt-3 text-sm text-cream/50" data-reveal>Click &amp; drag to look around</p>
      </AnimatedSection>

      <div
        ref={constraintsRef}
        data-cursor-drag="Drag"
        className="relative mx-auto max-w-7xl cursor-grab overflow-hidden px-6 active:cursor-grabbing md:px-10"
      >
        <motion.div
          drag="x"
          dragConstraints={constraintsRef}
          dragElastic={0.15}
          className="flex gap-4"
        >
          {frames.map((frame, i) => (
            <AnimatedImage
              key={frame.label}
              delay={i * 0.08}
              className="h-80 w-[22rem] shrink-0 rounded-3xl border border-gold/10"
              innerClassName={`grain bg-gradient-to-br ${frame.tone}`}
              hoverTilt
              shimmer
            >
              <span className="absolute bottom-4 left-4 eyebrow text-cream/60">{frame.label}</span>
            </AnimatedImage>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
