"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { detectStaticTier } from "@/lib/quality/detectTier";
import { useAppStore } from "@/lib/store/useAppStore";
import HeroFallback from "@/scenes/hero/HeroFallback";

const HeroScene = dynamic(() => import("@/scenes/hero/HeroScene"), {
  ssr: false,
  loading: () => <HeroFallback />,
});

export default function HeroCanvasLoader() {
  const qualityTier = useAppStore((s) => s.qualityTier);
  const setQualityTier = useAppStore((s) => s.setQualityTier);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!qualityTier) setQualityTier(detectStaticTier());
    setReady(true);
  }, [qualityTier, setQualityTier]);

  // Stop feeding the GPU once the hero scrolls out of view — the biggest
  // single perf win for a continuously-animating WebGL scene.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.05,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="absolute inset-0">
      {/* Crossfades the gradient stand-in into the real WebGL scene instead of
          an abrupt swap the instant the dynamic import resolves. */}
      <AnimatePresence>
        {!ready || qualityTier === "low" ? (
          <motion.div key="fallback" className="absolute inset-0" exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
            <HeroFallback />
          </motion.div>
        ) : (
          <motion.div
            key="scene"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <HeroScene active={visible} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
