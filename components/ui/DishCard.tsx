import { memo } from "react";
import type { MenuItem } from "@/content/menu";
import AnimatedCard from "@/components/ui/motion/AnimatedCard";

/**
 * Placeholder for the real photo-sequence PhotoTurntable (see technical plan).
 * No real signature-item photography exists yet, so this ships a drag/hover
 * tilt-card treatment instead of true 360deg frame scrubbing — swap in
 * <PhotoTurntable images={...}/> here once real photos land in brand_assets/.
 *
 * Memoized: `item` references are stable (SignatureMenuShowcase's `featured`
 * array is computed once at module scope), so this genuinely skips
 * re-rendering the 5 grid cards on unrelated parent re-renders.
 */
function DishCard({ item }: { item: MenuItem & { category: string } }) {
  return (
    <AnimatedCard className="grain aspect-[4/5] rounded-3xl border border-gold/10 bg-gradient-to-br from-ember-deep/50 via-espresso to-ink">
      <div className="absolute right-4 top-4 rounded-full border border-gold/30 px-3 py-1 text-[10px] uppercase tracking-eyebrow text-gold">
        360° Drag
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="eyebrow mb-2">{item.category}</p>
        <h3 className="font-display text-2xl text-cream">{item.name}</h3>
        <p className="mt-2 font-display text-lg text-ember">₹{item.price}</p>
      </div>
    </AnimatedCard>
  );
}

export default memo(DishCard);
