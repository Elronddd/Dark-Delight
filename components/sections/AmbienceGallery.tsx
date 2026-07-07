"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/motion/AnimatedSection";
import AnimatedHeading from "@/components/ui/motion/AnimatedHeading";
import AnimatedImage from "@/components/ui/motion/AnimatedImage";

// Static set of 4 — always fully visible, no drag/scroll interaction needed.
const frames = [
  { label: "The Bar", src: "/photos/real/bar-neon-shelving.webp", alt: "Illuminated bar shelving at Dark Delight" },
  { label: "Tandoor Smoke", src: "/photos/real/kebab-platter.jpeg", alt: "Chargrilled kebab platter" },
  { label: "Sweet Endings", src: "/photos/real/oreo-shake.webp", alt: "Oreo shake dessert" },
  { label: "The Dining Room", src: "/photos/real/dining-area.webp", alt: "Dark Delight dining room interior" },
];

export default function AmbienceGallery() {
  return (
    <section className="relative overflow-hidden bg-surface/50 py-32">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-ink/60 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-ink/60 to-transparent" />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-10 top-10 hidden h-64 w-64 rounded-full bg-rose/10 blur-3xl md:block"
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-0 hidden h-72 w-72 rounded-full bg-blush/10 blur-3xl md:block"
        animate={{ x: [0, -24, 0], y: [0, -16, 0] }}
        transition={{ duration: 21, repeat: Infinity, ease: "easeInOut" }}
      />

      <AnimatedSection variant="slide-right" className="relative mx-auto mb-10 max-w-7xl px-6 text-center md:px-10">
        <p className="eyebrow mb-4" data-reveal>In the Neighbourhood</p>
        <AnimatedHeading as="h2" className="font-display text-3xl uppercase text-cream md:text-4xl" text="A Look Inside" />
      </AnimatedSection>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {frames.map((frame, i) => (
            <AnimatedImage
              key={frame.label}
              delay={i * 0.08}
              className="aspect-[3/4] rounded-3xl border border-blush/10"
              innerClassName="grain bg-ink"
              src={frame.src}
              alt={frame.alt}
              sizes="(min-width: 768px) 25vw, 50vw"
              hoverTilt
            >
              <span className="absolute bottom-4 left-4 eyebrow text-cream/60">{frame.label}</span>
            </AnimatedImage>
          ))}
        </div>
      </div>
    </section>
  );
}
