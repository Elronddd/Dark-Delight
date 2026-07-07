import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Sampled directly from vibes.png's palette swatches.
        ink: "#12080A",
        surface: "#240C0E",
        wine: {
          DEFAULT: "#651D1D",
          deep: "#4A1515",
        },
        rose: {
          DEFAULT: "#944B4B",
          deep: "#7A3B3B",
        },
        blush: "#DDBABA",
        cream: "#F5EAE6",
      },
      fontFamily: {
        // "AA Cindie" (commercial, not on Google Fonts) — Unbounded is the
        // free lookalike: same bold, blocky, geometric-caps character.
        display: ["var(--font-unbounded)", "sans-serif"],
        // The moodboard names Helvetica directly — rather than substitute a
        // different free face, use the real system font stack: renders as
        // true Helvetica Neue on Mac/iOS and the near-identical Arial
        // elsewhere, at zero download cost.
        sans: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
      },
      letterSpacing: {
        eyebrow: "0.15em",
      },
    },
  },
  plugins: [],
};
export default config;
