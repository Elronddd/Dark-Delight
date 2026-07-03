import Link from "next/link";
import ShinyButton from "@/components/ui/ShinyButton";
import { business } from "@/content/business";

export default function ReservationCTA() {
  return (
    <section className="relative overflow-hidden bg-ink py-28">
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(50% 60% at 50% 50%, rgba(232,130,30,0.18), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-6 text-center md:px-10">
        <p className="eyebrow mb-4">Reserve Your Experience</p>
        <h2 className="font-display text-4xl text-cream md:text-5xl">Book Your Table Now</h2>
        <p className="mt-4 text-cream/70">
          Good food brings people together. We can&apos;t wait to welcome you.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/reservations">
            <ShinyButton>Reserve a Table</ShinyButton>
          </Link>
          <a href={business.phoneHref} className="eyebrow text-cream/70 hover:text-ember">
            or call {business.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
