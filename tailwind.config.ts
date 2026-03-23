import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#F6F4EF",
        ink: {
          DEFAULT: "#111110",
          2: "#666560",
          3: "#AEADA7",
        },
        gold: {
          DEFAULT: "#8B6338",
          light: "rgba(139,99,56,0.12)",
        },
        border: "rgba(17,17,16,0.09)",
        card: "rgba(255,255,255,0.55)",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-dm-sans)", "DM Sans", "sans-serif"],
      },
      keyframes: {
        photoReveal: {
          from: { opacity: "0", transform: "scale(1.04) translateY(8px)" },
          to: { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "photo-reveal": "photoReveal 0.6s ease forwards",
        "fade-up": "fadeUp 0.8s ease both",
      },
    },
  },
  plugins: [],
};
export default config;
