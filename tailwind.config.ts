import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#FAF8F5",
          bgAlt: "#F2F0EB",
          surface: "#FFFFFF",
          surface2: "#F7F4EF",
          muted: "#64748b",
          text: "#1e293b",
          accent: "#0b5394",
          accentLight: "#c9daf8",
          accentDark: "#083d6f",
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
