"use client";

import { useScrollReveal } from "@/lib/scroll/useScrollReveal";
import SplitHeading from "@/components/ui/SplitHeading";
import RevealPanel from "@/components/ui/RevealPanel";

const panels = [
  { label: "The Counter", tone: "from-ember/30 via-espresso to-ink" },
  { label: "The Tandoor", tone: "from-ember-deep/40 via-espresso to-ink" },
  { label: "The Corner Table", tone: "from-gold/20 via-espresso to-ink" },
];

export default function About() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="mx-auto max-w-6xl px-6 py-28 md:px-10">
      <div ref={ref} className="grid gap-16 md:grid-cols-2 md:items-center">
        <div>
          <p className="eyebrow mb-5" data-reveal>Our Story</p>
          <SplitHeading
            as="h2"
            className="font-display text-4xl leading-tight text-cream md:text-5xl"
            text="Brewed with passion, served with love."
          />
          <p className="mt-6 max-w-md text-cream/70" data-reveal>
            Good food, great ambience, and unforgettable moments — that&apos;s Dark Delight.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {panels.map((panel, i) => (
            <RevealPanel
              key={panel.label}
              className={`rounded-2xl ${i === 0 ? "col-span-3 aspect-[16/9]" : "aspect-square"}`}
              innerClassName={`grain bg-gradient-to-br ${panel.tone}`}
            >
              <span className="absolute bottom-3 left-3 eyebrow text-cream/60">{panel.label}</span>
            </RevealPanel>
          ))}
        </div>
      </div>
    </section>
  );
}
