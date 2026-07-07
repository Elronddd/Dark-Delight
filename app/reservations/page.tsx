import type { Metadata } from "next";
import ReservationForm from "./ReservationForm";
import { business } from "@/content/business";

export const metadata: Metadata = {
  title: "Reservations — Dark Delight | Patna",
  description: "Reserve a table at Dark Delight, Anandpuri, Patna — confirmed instantly via WhatsApp.",
};

export default function ReservationsPage() {
  return (
    <main className="min-h-screen bg-ink px-6 pb-24 pt-32 md:px-10">
      <div className="mx-auto max-w-lg text-center">
        <p className="eyebrow mb-4">Reserve Your Experience</p>
        <h1 className="font-display text-4xl uppercase text-cream md:text-5xl">Book a Table</h1>
        <p className="mx-auto mt-4 max-w-sm text-cream/70">
          Fill in your details below — we&apos;ll confirm on WhatsApp in minutes.
        </p>
      </div>

      <div className="mt-14">
        <ReservationForm />
      </div>

      <p className="mt-10 text-center text-sm text-cream/50">
        Prefer to call? <a href={business.phoneHref} className="text-blush hover:underline">{business.phone}</a>
      </p>
    </main>
  );
}
