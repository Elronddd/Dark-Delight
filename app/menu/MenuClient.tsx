"use client";

import { useMemo, useState } from "react";
import { menu } from "@/content/menu";

export default function MenuClient() {
  const [query, setQuery] = useState("");
  const [vegOnly, setVegOnly] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return menu
      .map((category) => ({
        ...category,
        subsections: category.subsections
          .map((sub) => ({
            ...sub,
            items: sub.items.filter(
              (item) =>
                (!vegOnly || item.veg) &&
                (!q || item.name.toLowerCase().includes(q))
            ),
          }))
          .filter((sub) => sub.items.length > 0),
      }))
      .filter((category) => category.subsections.length > 0);
  }, [query, vegOnly]);

  return (
    <div className="mx-auto mt-12 max-w-5xl px-6 md:px-10">
      {/* Filter bar */}
      <div className="sticky top-20 z-30 mb-10 flex flex-col gap-4 rounded-2xl border border-gold/10 bg-espresso/80 p-4 backdrop-blur-md sm:flex-row sm:items-center">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the menu…"
          aria-label="Search the menu"
          className="w-full rounded-xl border border-gold/20 bg-ink px-4 py-2 text-cream placeholder:text-cream/40 focus-visible:border-ember"
        />
        <label className="flex shrink-0 cursor-pointer items-center gap-2 text-sm text-cream/80">
          <input
            type="checkbox"
            checked={vegOnly}
            onChange={(e) => setVegOnly(e.target.checked)}
            className="h-4 w-4 accent-ember"
          />
          Veg only
        </label>
      </div>

      {/* Category jump nav */}
      <nav aria-label="Menu categories" className="mb-16 flex flex-wrap gap-2">
        {menu.map((category) => (
          <a
            key={category.id}
            href={`#${category.id}`}
            className="rounded-full border border-gold/20 px-3 py-1 text-xs text-cream/70 transition-colors hover:border-ember hover:text-ember"
          >
            {category.name}
          </a>
        ))}
      </nav>

      {filtered.length === 0 && (
        <p className="py-24 text-center text-cream/50">No dishes match your search.</p>
      )}

      {filtered.map((category) => (
        <section key={category.id} id={category.id} className="anchor-offset mb-20">
          <div className="mb-8 flex items-baseline gap-4 border-b border-gold/10 pb-3">
            <span className="font-display text-gold/60">{category.number}</span>
            <h2 className="font-display text-3xl text-cream">{category.name}</h2>
            {category.subtitle && (
              <span className="font-display italic text-cream/50">{category.subtitle}</span>
            )}
          </div>

          {category.subsections.map((sub, i) => (
            <div key={sub.label ?? i} className="mb-8">
              {sub.label && (
                <p className="eyebrow mb-4">{sub.label}</p>
              )}
              <div className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
                {sub.items.map((item) => (
                  <div key={item.name} className="flex items-baseline justify-between gap-3 border-b border-gold/5 pb-2">
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
                    <span className="shrink-0 whitespace-nowrap font-display text-gold">
                      ₹{item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
