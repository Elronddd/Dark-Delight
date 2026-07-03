"use client";

import { useState } from "react";
import ShinyButton from "@/components/ui/ShinyButton";
import { buildReservationWhatsAppUrl } from "@/lib/whatsapp";

export default function ReservationForm() {
  const [name, setName] = useState("");
  const [partySize, setPartySize] = useState("2");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const canSubmit = name.trim() && date && time;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    const url = buildReservationWhatsAppUrl({ name, partySize, date, time, notes });
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const inputClass =
    "w-full rounded-xl border border-gold/20 bg-espresso px-4 py-3 text-cream placeholder:text-cream/40 focus-visible:border-ember";

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-lg space-y-5">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm text-cream/70">
          Name
        </label>
        <input
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="partySize" className="mb-2 block text-sm text-cream/70">
            Party size
          </label>
          <select
            id="partySize"
            value={partySize}
            onChange={(e) => setPartySize(e.target.value)}
            className={inputClass}
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={String(n)}>
                {n} {n === 1 ? "guest" : "guests"}
              </option>
            ))}
            <option value="10+">10+ guests</option>
          </select>
        </div>

        <div>
          <label htmlFor="time" className="mb-2 block text-sm text-cream/70">
            Time
          </label>
          <input
            id="time"
            type="time"
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="date" className="mb-2 block text-sm text-cream/70">
          Date
        </label>
        <input
          id="date"
          type="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="notes" className="mb-2 block text-sm text-cream/70">
          Special requests <span className="text-cream/40">(optional)</span>
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="Birthday celebration, high chair, window seat…"
          className={inputClass}
        />
      </div>

      <ShinyButton type="submit" disabled={!canSubmit} className="w-full disabled:opacity-40">
        Send via WhatsApp
      </ShinyButton>
      <p className="text-center text-xs text-cream/40">
        This opens WhatsApp with your details pre-filled — we&apos;ll confirm your table there.
      </p>
    </form>
  );
}
