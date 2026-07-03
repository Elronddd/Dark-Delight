import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useAppStore } from "@/lib/store/useAppStore";
import { downgrade } from "./detectTier";

const SAMPLE_WINDOW_MS = 2000;
const FPS_THRESHOLD = 35;

/** Samples average frame rate for ~2s after mount; drops one quality tier if it stays janky. */
export function useAutoDowngrade() {
  const startTime = useRef<number | null>(null);
  const frameCount = useRef(0);
  const done = useRef(false);
  const qualityTier = useAppStore((s) => s.qualityTier);
  const setQualityTier = useAppStore((s) => s.setQualityTier);

  useFrame((state) => {
    if (done.current || !qualityTier) return;
    const now = state.clock.elapsedTime * 1000;
    if (startTime.current === null) startTime.current = now;

    frameCount.current += 1;
    const elapsed = now - startTime.current;

    if (elapsed >= SAMPLE_WINDOW_MS) {
      const avgFps = frameCount.current / (elapsed / 1000);
      done.current = true;
      if (avgFps < FPS_THRESHOLD) {
        setQualityTier(downgrade(qualityTier));
      }
    }
  });
}
