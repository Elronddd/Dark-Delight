import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useAppStore } from "@/lib/store/useAppStore";
import { downgrade } from "./detectTier";

const FAST_CHECK_MS = 700;
const FAST_CHECK_FPS_FLOOR = 20;
const NORMAL_CHECK_MS = 2500;
const NORMAL_CHECK_FPS_FLOOR = 35;

/**
 * Continuously samples frame rate in rolling windows and drops quality tiers
 * one step at a time when the device can't keep up (never skips a tier —
 * e.g. never jumps straight from High to Low, which would kill the whole
 * WebGL scene when disabling just postprocessing might have been enough).
 * Runs for the life of the scene, not just once, since thermal throttling
 * can degrade performance mid-session, and since the static
 * hardwareConcurrency heuristic is a poor proxy for GPU capability — this
 * is the real safety net.
 */
export function useAutoDowngrade() {
  const windowStart = useRef<number | null>(null);
  const frameCount = useRef(0);
  const firstCheckDone = useRef(false);
  const qualityTier = useAppStore((s) => s.qualityTier);
  const setQualityTier = useAppStore((s) => s.setQualityTier);

  useFrame((state) => {
    if (!qualityTier || qualityTier === "low") return;
    const now = state.clock.elapsedTime * 1000;
    if (windowStart.current === null) windowStart.current = now;

    frameCount.current += 1;
    const elapsed = now - windowStart.current;
    const checkPoint = firstCheckDone.current ? NORMAL_CHECK_MS : FAST_CHECK_MS;
    const floor = firstCheckDone.current ? NORMAL_CHECK_FPS_FLOOR : FAST_CHECK_FPS_FLOOR;

    if (elapsed >= checkPoint) {
      const avgFps = frameCount.current / (elapsed / 1000);
      firstCheckDone.current = true;

      if (avgFps < floor) {
        setQualityTier(downgrade(qualityTier));
      }

      windowStart.current = now;
      frameCount.current = 0;
    }
  });
}
