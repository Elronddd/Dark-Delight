"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import PrimaryButton from "@/components/ui/PrimaryButton";
import LogoMark from "@/components/ui/LogoMark";
import { useAppStore } from "@/lib/store/useAppStore";
import { SPRING_NAV_INDICATOR } from "@/lib/animations/transitions";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/reservations", label: "Reservations" },
];

const MotionLink = motion.create(Link);

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <MotionLink
      href={href}
      data-cursor-hover
      className={`relative eyebrow inline-block py-1 transition-colors ${
        active ? "text-blush" : "text-cream/75 hover:text-blush"
      }`}
    >
      {label}
      {active && (
        <motion.span
          layoutId="nav-active-indicator"
          className="absolute -bottom-1 left-0 right-0 h-px bg-blush"
          transition={SPRING_NAV_INDICATOR}
        />
      )}
    </MotionLink>
  );
}

export default function Navbar() {
  const solid = useAppStore((s) => s.isScrolled);
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 240, damping: 30, delay: 0.1 }}
      className={`grain fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,padding] duration-300 ${
        solid ? "bg-ink/95 backdrop-blur-md" : "bg-gradient-to-b from-ink/95 via-ink/70 to-transparent"
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
          className="group flex items-center gap-2 font-display text-lg tracking-tight text-cream"
        >
          <motion.span
            whileHover={{ rotate: 20, scale: 1.06 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="inline-flex"
          >
            <LogoMark className="h-7 w-7" />
          </motion.span>
          DARK DELIGHT
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <NavLink href={link.href} label={link.label} active={pathname === link.href} />
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Link href="/reservations">
            <PrimaryButton className="text-sm">Reserve a Table</PrimaryButton>
          </Link>
        </div>

        <button
          type="button"
          data-cursor-hover
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-panel"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((v) => !v)}
          className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <motion.span animate={mobileOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }} className="h-px w-6 bg-cream" />
          <motion.span animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} className="h-px w-6 bg-cream" />
          <motion.span animate={mobileOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }} className="h-px w-6 bg-cream" />
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden bg-ink/95 backdrop-blur-md md:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } } }}
              className="flex flex-col gap-1 px-6 pb-6 pt-2"
            >
              {links.map((link) => (
                <motion.li key={link.href} variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
                  <Link
                    href={link.href}
                    data-cursor-hover
                    className={`block py-3 font-display text-xl ${pathname === link.href ? "text-blush" : "text-cream/90"}`}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} className="mt-3">
                <Link href="/reservations">
                  <PrimaryButton className="w-full text-sm">Reserve a Table</PrimaryButton>
                </Link>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
