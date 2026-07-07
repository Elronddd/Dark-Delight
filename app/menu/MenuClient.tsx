"use client";

import { useMemo, useState } from "react";
import { menu } from "@/content/menu";
import MenuCategorySection from "./MenuCategorySection";

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
      <div className="sticky top-20 z-30 mb-10 flex flex-col gap-4 rounded-2xl border border-blush/10 bg-surface/80 p-4 backdrop-blur-md sm:flex-row sm:items-center">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the menu…"
          aria-label="Search the menu"
          className="w-full rounded-xl border border-blush/20 bg-ink px-4 py-2 text-cream placeholder:text-cream/40 focus-visible:border-blush"
        />
        <label className="flex shrink-0 cursor-pointer items-center gap-2 text-sm text-cream/80">
          <input
            type="checkbox"
            checked={vegOnly}
            onChange={(e) => setVegOnly(e.target.checked)}
            className="h-4 w-4 accent-rose"
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
            data-cursor-hover
            className="rounded-full border border-blush/20 px-3 py-1 text-xs text-cream/70 transition-colors hover:border-blush hover:text-blush"
          >
            {category.name}
          </a>
        ))}
      </nav>

      {filtered.length === 0 && (
        <p className="item-enter py-24 text-center text-cream/50">No dishes match your search.</p>
      )}

      {filtered.map((category, index) => (
        <MenuCategorySection key={category.id} category={category} index={index} />
      ))}
    </div>
  );
}
