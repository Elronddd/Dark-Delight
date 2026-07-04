"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ShinyButton from "@/components/ui/ShinyButton";
import LogoMark from "@/components/ui/LogoMark";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/reservations", label: "Reservations" },
];

export default function Navbar() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,padding] duration-300 ${
        solid ? "bg-ink/90 backdrop-blur-md" : "bg-gradient-to-b from-ink/80 to-transparent"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10 transition-[padding] duration-300 ${
          solid ? "py-4" : "py-6"
        }`}
      >
        <Link
          href="/"
          data-cursor-hover
          className="flex items-center gap-2 font-display text-xl tracking-tight text-cream"
        >
          <LogoMark className="h-7 w-7" />
          Dark Delight
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                data-cursor-hover
                className="eyebrow text-cream/80 transition-colors hover:text-ember"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/reservations">
          <ShinyButton className="text-sm">Reserve a Table</ShinyButton>
        </Link>
      </nav>
    </header>
  );
}
