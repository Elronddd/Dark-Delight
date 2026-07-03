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
        ink: "#17110C",
        espresso: "#3B2A1E",
        ember: {
          DEFAULT: "#E8821E",
          deep: "#C4650F",
        },
        cream: "#F5EDE0",
        gold: "#C9A463",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        "eyebrow": "0.15em",
      },
    },
  },
  plugins: [],
};
export default config;
