"use client";

import AnimatedSection from "@/components/ui/motion/AnimatedSection";
import type { MenuCategory } from "@/content/menu";

export default function MenuCategorySection({ category, index }: { category: MenuCategory; index: number }) {
  return (
    <AnimatedSection
      as="section"
      id={category.id}
      y={20}
      stagger={0.03}
      // Alternates by category order so the long category list doesn't read
      // as one repeated animation for all sixteen sections.
      variant={index % 2 === 0 ? "slide-left" : "slide-right"}
      className="anchor-offset mb-20"
      aria-labelledby={`${category.id}-heading`}
    >
      <div className="mb-8 flex items-baseline gap-4 border-b border-blush/10 pb-3" data-reveal>
        <span className="font-display text-blush/60">{category.number}</span>
        <h2 id={`${category.id}-heading`} className="font-display text-2xl uppercase text-cream">
          {category.name}
        </h2>
        {category.subtitle && (
          <span className="font-sans italic text-cream/50">{category.subtitle}</span>
        )}
      </div>

      {category.subsections.map((sub, i) => (
        <div key={sub.label ?? i} className="mb-8" data-reveal>
          {sub.label && <h3 className="eyebrow mb-4 font-sans">{sub.label}</h3>}
          <div className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {sub.items.map((item) => (
              // Keyed on name so filtering swaps in a genuinely new node per
              // match, which is what makes .item-enter's mount animation replay.
              <div
                key={item.name}
                className="item-enter flex items-baseline justify-between gap-3 border-b border-blush/5 pb-2"
              >
                <span className="flex items-center gap-2 text-cream/90">
                  <span
                    aria-label={item.veg ? "Vegetarian" : "Non-vegetarian"}
                    className={`inline-block h-2.5 w-2.5 shrink-0 border ${
                      item.veg ? "border-green-500 bg-green-500/80" : "border-red-500 bg-red-500/80"
                    }`}
                  />
                  {item.name}
                  {item.signature && (
                    <span className="eyebrow rounded-full bg-rose/10 px-2 py-0.5 text-[10px] text-blush">
                      Signature
                    </span>
                  )}
                </span>
                <span className="shrink-0 whitespace-nowrap font-display text-blush">₹{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </AnimatedSection>
  );
}
