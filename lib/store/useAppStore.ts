import { create } from "zustand";

type AppState = {
  /** Owned by the single shared scroll listener in SmoothScrollProvider —
   * components (e.g. Navbar) read this instead of adding their own listener. */
  isScrolled: boolean;
  setIsScrolled: (isScrolled: boolean) => void;
};

export const useAppStore = create<AppState>()((set) => ({
  isScrolled: false,
  setIsScrolled: (isScrolled) => set({ isScrolled }),
}));
