"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { MenuItem } from "@/content/menu";

/**
 * Placeholder for the real photo-sequence PhotoTurntable (see technical plan).
 * No real signature-item photography exists yet, so this ships a drag/hover
 * tilt-card treatment instead of true 360deg frame scrubbing — swap in
 * <PhotoTurntable images={...}/> here once real photos land in brand_assets/.
 */
export default function DishCard({ item }: { item: MenuItem & { category: string } }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 20 });

  return (
    <motion.div
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className="grain group relative aspect-[4/5] overflow-hidden rounded-3xl border border-gold/10 bg-gradient-to-br from-ember-deep/50 via-espresso to-ink"
    >
      <div className="absolute right-4 top-4 rounded-full border border-gold/30 px-3 py-1 text-[10px] uppercase tracking-eyebrow text-gold">
        360° Drag
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="eyebrow mb-2">{item.category}</p>
        <h3 className="font-display text-2xl text-cream">{item.name}</h3>
        <p className="mt-2 font-display text-lg text-ember">₹{item.price}</p>
      </div>
    </motion.div>
  );
}
