import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // shadcn CSS variable colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        // Kintsugi gold palette
        kintsugi: {
          50: "#fdf8f0",
          100: "#f9edda",
          200: "#f2d7b0",
          300: "#e8bc7e",
          400: "#d4a574",
          500: "#c4883e",
          600: "#b8860b",
          700: "#8b6914",
          800: "#6b5118",
          900: "#5a4416",
        },
        gold: {
          light: "#f5d485",
          DEFAULT: "#d4a574",
          dark: "#b8860b",
          glow: "#f5c842",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "gold-pulse": "goldPulse 2s ease-in-out infinite",
        "crack-repair": "crackRepair 1.5s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        goldPulse: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        crackRepair: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "50%": { opacity: "0.5", borderColor: "#d4a574" },
          "100%": { opacity: "1", transform: "scale(1)", borderColor: "#f5c842", boxShadow: "0 0 20px rgba(212, 165, 116, 0.3)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #b8860b, #d4a574, #f5c842, #d4a574, #b8860b)",
        "gold-shimmer": "linear-gradient(90deg, transparent, rgba(212, 165, 116, 0.3), transparent)",
      },
    },
  },
  plugins: [],
};

export default config;
