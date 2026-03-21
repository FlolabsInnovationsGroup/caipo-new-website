import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Syne", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        serif: ["Instrument Serif", "serif"],
      },
      colors: {
        purple: {
          DEFAULT: "#7c3aed",
          light: "#a78bfa",
        },
      },
    },
  },
  plugins: [],
};
export default config;
