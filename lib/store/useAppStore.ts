import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { QualityTier } from "@/lib/quality/tiers";

type AppState = {
  soundOn: boolean;
  toggleSound: () => void;

  qualityTier: QualityTier | null;
  setQualityTier: (tier: QualityTier) => void;

  activeSceneIndex: number;
  setActiveSceneIndex: (i: number) => void;

  /** Owned by the single shared scroll listener in SmoothScrollProvider —
   * components (e.g. Navbar) read this instead of adding their own listener. */
  isScrolled: boolean;
  setIsScrolled: (isScrolled: boolean) => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      soundOn: false,
      toggleSound: () => set((s) => ({ soundOn: !s.soundOn })),

      qualityTier: null,
      setQualityTier: (tier) => set({ qualityTier: tier }),

      activeSceneIndex: 0,
      setActiveSceneIndex: (i) => set({ activeSceneIndex: i }),

      isScrolled: false,
      setIsScrolled: (isScrolled) => set({ isScrolled }),
    }),
    {
      name: "dark-delight-app-store",
      partialize: (s) => ({ soundOn: s.soundOn, qualityTier: s.qualityTier }),
    }
  )
);
