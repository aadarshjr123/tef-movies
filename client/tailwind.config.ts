import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Roboto Mono Variable"', "ui-monospace", "monospace"],
      },
      colors: {
        // The original site's dark background.
        night: { DEFAULT: "#131A27", raised: "#1B2436", border: "#2A3448" },
      },
      keyframes: {
        "fade-in": { from: { opacity: "0", transform: "translateY(-6px)" }, to: { opacity: "1", transform: "none" } },
      },
      animation: { "fade-in": "fade-in 0.4s ease-out" },
    },
  },
  plugins: [],
} satisfies Config;
