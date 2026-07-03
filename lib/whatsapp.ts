import { business } from "@/content/business";

export type ReservationDetails = {
  name: string;
  partySize: string;
  date: string;
  time: string;
  notes?: string;
};

export function buildReservationWhatsAppUrl(details: ReservationDetails): string {
  const lines = [
    `Hi Dark Delight! I'd like to reserve a table.`,
    `Name: ${details.name}`,
    `Party size: ${details.partySize}`,
    `Date: ${details.date}`,
    `Time: ${details.time}`,
    details.notes ? `Notes: ${details.notes}` : null,
  ].filter(Boolean);

  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${business.whatsappNumber}?text=${text}`;
}
