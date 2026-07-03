import Link from "next/link";
import { business } from "@/content/business";
import LogoMark from "@/components/ui/LogoMark";

export default function Footer() {
  return (
    <footer className="border-t border-gold/10 bg-ink">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <LogoMark className="mb-3 h-8 w-8" />
            <p className="font-display text-2xl text-cream">{business.name}</p>
            <p className="mt-1 text-sm text-gold">{business.tagline}</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
              {business.storyLine}
            </p>
          </div>

          <div>
            <p className="eyebrow mb-4">Quick Links</p>
            <ul className="space-y-2 text-sm text-cream/70">
              <li><Link href="/" className="hover:text-ember">Home</Link></li>
              <li><Link href="/menu" className="hover:text-ember">Menu</Link></li>
              <li><Link href="/reservations" className="hover:text-ember">Reservations</Link></li>
              <li>
                <a href={business.zomatoUrl} target="_blank" rel="noreferrer" className="hover:text-ember">
                  Order on Zomato
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4">Contact</p>
            <ul className="space-y-2 text-sm text-cream/70">
              <li>
                <a href={business.phoneHref} className="hover:text-ember">{business.phone}</a>
              </li>
              <li>
                <a href={business.mapsQueryUrl} target="_blank" rel="noreferrer" className="hover:text-ember">
                  {business.address}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4">Opening Hours</p>
            <ul className="space-y-2 text-sm text-cream/70">
              {business.hours.map((h) => (
                <li key={h.days} className="flex justify-between gap-4">
                  <span>{h.days}</span>
                  <span className="text-cream/50">{h.time}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-4">
              <a href={business.social.instagram} target="_blank" rel="noreferrer" className="text-cream/70 hover:text-ember">
                Instagram
              </a>
              <a href={business.social.facebook} target="_blank" rel="noreferrer" className="text-cream/70 hover:text-ember">
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-gold/10 pt-8 text-xs text-cream/40">
          © {new Date().getFullYear()} Dark Delight Restaurant & Cafe. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
