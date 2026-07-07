import { memo } from "react";
import type { MenuItem } from "@/content/menu";
import AnimatedCard from "@/components/ui/motion/AnimatedCard";

/**
 * Placeholder for a future photo-sequence showcase — no real signature-item
 * photography exists yet, so this ships a drag/hover tilt-card treatment
 * instead of true 360° frame scrubbing.
 */
function DishCard({ item }: { item: MenuItem & { category: string } }) {
  return (
    <AnimatedCard className="grain aspect-[4/5] rounded-3xl border border-blush/10 bg-gradient-to-br from-wine/60 via-surface to-ink">
      <div className="absolute right-4 top-4 rounded-full border border-blush/30 px-3 py-1 text-[10px] uppercase tracking-eyebrow text-blush">
        Signature
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="eyebrow mb-2">{item.category}</p>
        <h3 className="font-display text-xl uppercase text-cream">{item.name}</h3>
        <p className="mt-2 font-display text-lg text-blush">₹{item.price}</p>
      </div>
    </AnimatedCard>
  );
}

export default memo(DishCard);
