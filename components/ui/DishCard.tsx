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
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
        <p className="eyebrow mb-1.5 md:mb-2">{item.category}</p>
        <h3 className="font-display text-sm uppercase leading-snug text-cream sm:text-base md:text-lg lg:text-xl">
          {item.name}
        </h3>
        <p className="mt-1.5 font-display text-base text-blush md:mt-2 md:text-lg">₹{item.price}</p>
      </div>
    </AnimatedCard>
  );
}

export default memo(DishCard);
