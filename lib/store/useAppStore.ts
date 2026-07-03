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
    }),
    {
      name: "dark-delight-app-store",
      partialize: (s) => ({ soundOn: s.soundOn, qualityTier: s.qualityTier }),
    }
  )
);
