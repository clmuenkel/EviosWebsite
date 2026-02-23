import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#0b1220",
          surface: "#121a2b",
          surface2: "#182338",
          muted: "#8fa3bf",
          text: "#e5edf8",
          accent: "#3b82f6",
          accentDark: "#2563eb",
        },
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        72: "18rem",
        84: "21rem",
        96: "24rem",
      },
    },
  },
  plugins: [],
};

export default config;
