import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "toast-in": "toast-in 0.3s forwards",
        "toast-out": "toast-out 0.3s forwards",
      },
      backgroundImage: {
        illustration: "url('/images/illustration-phone-mockup.svg')",
      },
      boxShadow: {
        "active-selection": "0px 0px 32px 0px rgba(99, 60, 255, 0.25)",
        "box-shadow": "0px 0px 32px 0px rgba(0, 0, 0, 0.10);",
      },
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
      cursor: {
        custom: "url('/images/cursor.svg'), auto",
      },

      fontSize: {
        "heading-m": ["32px", { lineHeight: "150%", fontWeight: 700 }],
        "heading-s": ["16px", { lineHeight: "150%", fontWeight: 600 }],
        "body-m": ["16px", { lineHeight: "150%", fontWeight: 400 }],
        "body-s": ["12px", { lineHeight: "150%", fontWeight: 400 }],
      },

      keyframes: {
        "toast-in": {
          "0%": { opacity: "0", transform: "translate(-50%, -20px)" },
          "100%": { opacity: "1", transform: "translate(-50%, 0)" },
        },
        "toast-out": {
          "0%": { opacity: "1", transform: "translate(-50%, 0)" },
          "100%": { opacity: "0", transform: "translateY(50%, -20px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
