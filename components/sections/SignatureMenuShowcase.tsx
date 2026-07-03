"use client";

import Link from "next/link";
import { signatureItems } from "@/content/menu";
import { useScrollReveal } from "@/lib/scroll/useScrollReveal";
import DishCard from "@/components/ui/DishCard";
import NeonButton from "@/components/ui/NeonButton";

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
  const ref = useScrollReveal<HTMLDivElement>();
  const featured = FEATURED_NAMES.map((name) =>
    signatureItems.find((item) => item.name === name)
  ).filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <section className="mx-auto max-w-7xl px-6 py-28 md:px-10">
      <div ref={ref} className="mb-14 text-center">
        <p className="eyebrow mb-4" data-reveal>Our Signature</p>
        <h2 className="font-display text-4xl text-cream md:text-5xl" data-reveal>
          Discover Our Exquisite Menu
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
        {featured.map((item) => (
          <DishCard key={item.name} item={item} />
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
