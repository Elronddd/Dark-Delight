"use client";

import { business } from "@/content/business";
import AnimatedSection from "@/components/ui/motion/AnimatedSection";

const cuisines = ["Tandoor", "Chinese", "Biryani", "Continental", "Coffee & Shakes"];

export default function TrustStrip() {
  return (
    <section className="relative overflow-hidden border-y border-gold/10 bg-espresso/40">
      {/* Softens the hard color-cut from Hero's bg-ink into this section's tint. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-ink/50 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-ink/50 to-transparent"
      />
      <AnimatedSection
        variant="scale"
        className="relative mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-10 text-center sm:grid-cols-3 sm:divide-x sm:divide-gold/10 md:px-10"
      >
        <div data-reveal>
          <p className="eyebrow mb-2">Rated</p>
          <p className="font-display text-2xl text-cream">
            {business.rating.value.toFixed(1)}★{" "}
            <span className="text-base text-cream/50">({business.rating.reviewCountLabel})</span>
          </p>
        </div>
        <div data-reveal>
          <p className="eyebrow mb-2">Open Today</p>
          <p className="font-display text-2xl text-cream">{business.hours[0].time}</p>
        </div>
        <div data-reveal>
          <p className="eyebrow mb-2">Kitchen</p>
          <p className="mx-auto max-w-xs font-display text-lg text-cream/80">
            {cuisines.join(" · ")}
          </p>
        </div>
      </AnimatedSection>
    </section>
  );
}
