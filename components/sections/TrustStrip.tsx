"use client";

import { business } from "@/content/business";
import AnimatedSection from "@/components/ui/motion/AnimatedSection";

const cuisines = ["Tandoor", "Chinese", "Biryani", "Continental", "Coffee & Shakes"];

export default function TrustStrip() {
  return (
    <section className="border-y border-gold/10 bg-espresso/40">
      <AnimatedSection className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-10 text-center sm:grid-cols-3 md:px-10">
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
