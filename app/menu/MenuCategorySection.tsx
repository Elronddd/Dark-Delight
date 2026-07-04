"use client";

import { useScrollReveal } from "@/lib/scroll/useScrollReveal";
import type { MenuCategory } from "@/content/menu";

export default function MenuCategorySection({ category }: { category: MenuCategory }) {
  const ref = useScrollReveal<HTMLElement>({ y: 20, stagger: 0.03 });

  return (
    <section ref={ref} id={category.id} className="anchor-offset mb-20" data-reveal>
      <div className="mb-8 flex items-baseline gap-4 border-b border-gold/10 pb-3">
        <span className="font-display text-gold/60">{category.number}</span>
        <h2 className="font-display text-3xl text-cream">{category.name}</h2>
        {category.subtitle && (
          <span className="font-display italic text-cream/50">{category.subtitle}</span>
        )}
      </div>

      {category.subsections.map((sub, i) => (
        <div key={sub.label ?? i} className="mb-8">
          {sub.label && <p className="eyebrow mb-4">{sub.label}</p>}
          <div className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {sub.items.map((item) => (
              <div
                key={item.name}
                className="flex items-baseline justify-between gap-3 border-b border-gold/5 pb-2"
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
                    <span className="eyebrow rounded-full bg-ember/10 px-2 py-0.5 text-[10px] text-ember">
                      Signature
                    </span>
                  )}
                </span>
                <span className="shrink-0 whitespace-nowrap font-display text-gold">₹{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
