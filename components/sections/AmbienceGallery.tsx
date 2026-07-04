"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/lib/scroll/useScrollReveal";
import SplitHeading from "@/components/ui/SplitHeading";
import RevealPanel from "@/components/ui/RevealPanel";

const frames = [
  { label: "The Bar", tone: "from-ember/25 via-espresso to-ink" },
  { label: "Tandoor Smoke", tone: "from-ember-deep/40 via-espresso to-ink" },
  { label: "Evening Light", tone: "from-gold/20 via-espresso to-ink" },
  { label: "The Booths", tone: "from-ember/20 via-espresso to-ink" },
  { label: "Late Night", tone: "from-ember-deep/30 via-espresso to-ink" },
];

export default function AmbienceGallery() {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const revealRef = useScrollReveal<HTMLDivElement>();

  return (
    <section className="overflow-hidden bg-espresso/30 py-28">
      <div ref={revealRef} className="mx-auto mb-10 max-w-7xl px-6 text-center md:px-10">
        <p className="eyebrow mb-4" data-reveal>In the Neighbourhood</p>
        <SplitHeading as="h2" className="font-display text-4xl text-cream md:text-5xl" text="A Look Inside" />
        <p className="mt-3 text-sm text-cream/50" data-reveal>Click &amp; drag to look around</p>
      </div>

      <div
        ref={constraintsRef}
        data-cursor-hover
        className="mx-auto max-w-7xl cursor-grab overflow-hidden px-6 active:cursor-grabbing md:px-10"
      >
        <motion.div
          drag="x"
          dragConstraints={constraintsRef}
          dragElastic={0.15}
          className="flex gap-4"
        >
          {frames.map((frame, i) => (
            <RevealPanel
              key={frame.label}
              delay={i * 0.08}
              className="h-80 w-[22rem] shrink-0 rounded-3xl border border-gold/10"
              innerClassName={`grain bg-gradient-to-br ${frame.tone}`}
            >
              <span className="absolute bottom-4 left-4 eyebrow text-cream/60">{frame.label}</span>
            </RevealPanel>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
