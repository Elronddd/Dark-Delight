import type { Metadata } from "next";
import MenuClient from "./MenuClient";

export const metadata: Metadata = {
  title: "Menu — Dark Delight | Patna",
  description:
    "The full Dark Delight menu: tandoor tikkas, Chinese starters, biryani, rolls, continental, desserts, shakes, and coffee. Anandpuri, Patna.",
};

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-ink pb-24 pt-32">
      <div className="mx-auto max-w-5xl px-6 text-center md:px-10">
        <p className="eyebrow mb-4">Patna · Bihar</p>
        <h1 className="font-display text-4xl uppercase text-cream md:text-5xl">The Full Menu</h1>
        <p className="mx-auto mt-4 max-w-xl text-cream/70">
          Sixteen sections, one kitchen — from tandoor smoke to falooda. Search, filter, and find
          your next favourite.
        </p>
      </div>

      <MenuClient />
    </main>
  );
}
