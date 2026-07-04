"use client";

import { useRef } from "react";
import Link from "next/link";
import { signatureItems } from "@/content/menu";
import DishCard from "@/components/ui/DishCard";
import NeonButton from "@/components/ui/NeonButton";
import AnimatedSection from "@/components/ui/motion/AnimatedSection";
import AnimatedHeading from "@/components/ui/motion/AnimatedHeading";
import AnimatedContainer from "@/components/ui/motion/AnimatedContainer";
import { useParallaxScrub } from "@/lib/scroll/useParallaxScrub";

// Curated for visual variety — one from each format. See conversation notes
// for the shortlist rationale; swap freely once real photography exists.
const FEATURED_NAMES = [
  "Dark Delight Chicken Chilli",
  "Dark Delight Spl Tikka",
  "Dark Delight Special Falooda",
  "Dark Delight Pulao",
  "Dark Delight Chocolate Shake",
];

// Both FEATURED_NAMES and signatureItems are static, so this only needs to
// run once at module load rather than on every render.
const featured = FEATURED_NAMES.map((name) =>
  signatureItems.find((item) => item.name === name)
).filter((item): item is NonNullable<typeof item> => Boolean(item));

export default function SignatureMenuShowcase() {
  const glowRef = useRef<HTMLDivElement>(null);
  useParallaxScrub(glowRef, -15);

  return (
    <section className="relative overflow-hidden mx-auto max-w-7xl px-6 py-28 md:px-10">
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background: "radial-gradient(50% 45% at 85% 10%, rgba(232,130,30,0.12), transparent 70%)",
        }}
      />
      <AnimatedSection variant="mask" className="relative mb-14 text-center">
        <p className="eyebrow mb-4" data-reveal>Our Signature</p>
        <AnimatedHeading
          as="h2"
          className="font-display text-4xl text-cream md:text-5xl"
          text="Discover Our Exquisite Menu"
        />
      </AnimatedSection>

      <AnimatedSection
        y={48}
        stagger={0.08}
        variant="scale"
        rotate={5}
        className="relative grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5"
      >
        {featured.map((item) => (
          <AnimatedContainer key={item.name}>
            <DishCard item={item} />
          </AnimatedContainer>
        ))}
      </AnimatedSection>

      <div className="relative mt-14 text-center">
        <Link href="/menu">
          <NeonButton>See Full Menu</NeonButton>
        </Link>
      </div>
    </section>
  );
}
