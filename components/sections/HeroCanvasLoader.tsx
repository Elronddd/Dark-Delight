"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (!qualityTier) setQualityTier(detectStaticTier());
    setReady(true);
  }, [qualityTier, setQualityTier]);

  if (!ready) return <HeroFallback />;
  if (qualityTier === "low") return <HeroFallback />;

  return <HeroScene />;
}
