const defaultTheme = require("tailwindcss/defaultConfig");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    ...defaultTheme,
    container: { center: true },
    // default breakpoints but with 40px removed
    screens: {
      sm: "600px",
      md: "768px",
      lg: "768px",
      xl: "768px",
      "2xl": "768px",
    },
    extend: {
      fontFamily: {
        mono: ["IBM Plex Mono", "monospace"],
        oatmealPro: ["var(--font-oatmealPro)"],
        oatmealProMedium: ["var(--font-oatmealProMedium)"],
      },
      fontSize: {
        "heading-0": ["40px", "40px"],
        "heading-1": ["32px", "40px"],
        "heading-2": ["24px", "32px"],
        "paragraph-accent": ["16px", "24px"],
        paragraph: ["16px", "24px"],
        mono: ["12px", "16px"],
      },
      colors: {
        primary: "#4F41EF",
        "primary-content": "#FFFFFF",
        secondary: "#EFEDFE",
        "secondary-content": "#4F41EF",
        "neutral-dark": "#05003B",
        "neutral-dark-content": "#FFFFFF",
        "neutral-light": "#FFFFFF",
        "neutral-light-content": "#05003B",
        "base-100": "#FAFAFA",
        "base-200": "#F5F5F6",
        "base-300": "#EEEDF0",
        "base-content": "#05003B",
        positive: "#49CC7E",
        "success-content": "#FFFFFF",
        warning: "#EC2A41",
        negative: "#EC2A41",
        background: "#FAFAFA",
        "gray-800": "#666482",
      },
      animation: {
        ["infinite-slider"]: "infiniteSlider 20s linear infinite",
      },
      keyframes: {
        infiniteSlider: {
          "0%": { transform: "translateX(0)" },
          "100%": {
            transform: "translateX(calc(-250px * 2))",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
