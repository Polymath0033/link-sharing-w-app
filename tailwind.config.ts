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
        purple: "#633CFF",
        "purple-hover": "#BEADFF",
        "light-purple": "#EFEBFF",
        "dark-grey": "#333333",
        grey: "#737373",
        borders: "#D9D9D9",
        "light-grey": "#FAFAFA",
        red: "#FF3939",
      },
      fontSize: {
        "heading-m": ["32px", { lineHeight: "150%", fontWeight: 700 }],
        "heading-s": ["16px", { lineHeight: "150%", fontWeight: 600 }],
        "body-m": ["16px", { lineHeight: "150%", fontWeight: 400 }],
        "body-s": ["12px", { lineHeight: "150%", fontWeight: 400 }],
      },
      boxShadow: {
        "active-selection": "0px 0px 32px 0px rgba(99, 60, 255, 0.25)",
      },
      cursor:{
        
      }
    },
  },
  plugins: [],
};
export default config;
