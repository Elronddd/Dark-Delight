"use client";

import Link from "next/link";
import { signatureItems } from "@/content/menu";
import { useScrollReveal } from "@/lib/scroll/useScrollReveal";
import DishCard from "@/components/ui/DishCard";
import NeonButton from "@/components/ui/NeonButton";
import SplitHeading from "@/components/ui/SplitHeading";

// Curated for visual variety — one from each format. See conversation notes
// for the shortlist rationale; swap freely once real photography exists.
const FEATURED_NAMES = [
  "Dark Delight Chicken Chilli",
  "Dark Delight Spl Tikka",
  "Dark Delight Special Falooda",
  "Dark Delight Pulao",
  "Dark Delight Chocolate Shake",
];

export default function SignatureMenuShowcase() {
  const headingRef = useScrollReveal<HTMLDivElement>();
  const gridRef = useScrollReveal<HTMLDivElement>({ y: 48, stagger: 0.08 });
  const featured = FEATURED_NAMES.map((name) =>
    signatureItems.find((item) => item.name === name)
  ).filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <section className="mx-auto max-w-7xl px-6 py-28 md:px-10">
      <div ref={headingRef} className="mb-14 text-center">
        <p className="eyebrow mb-4" data-reveal>Our Signature</p>
        <SplitHeading
          as="h2"
          className="font-display text-4xl text-cream md:text-5xl"
          text="Discover Our Exquisite Menu"
        />
      </div>

      <div ref={gridRef} className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
        {featured.map((item) => (
          <div key={item.name} data-reveal>
            <DishCard item={item} />
          </div>
        ))}
      </div>

      <div className="mt-14 text-center">
        <Link href="/menu">
          <NeonButton>See Full Menu</NeonButton>
        </Link>
      </div>
    </section>
  );
}
