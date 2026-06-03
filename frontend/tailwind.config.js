/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Fraunces"', "serif"],
        sans: ['"DM Sans"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      colors: {
        // Soundlull v2 — Cinematic Forest
        night: "#0B100D",
        night2: "#121916",
        forest: "#172420",
        glass: "rgba(255,255,255,0.04)",
        glassStrong: "rgba(255,255,255,0.08)",
        line: "rgba(236,231,217,0.1)",
        lineSoft: "rgba(236,231,217,0.06)",
        cream: "#ECE7D9",
        creamSoft: "#C9C3B5",
        muted: "#7C8983",
        mutedDim: "#4F5A55",
        gold: "#E0B176",
        goldDark: "#B68D5C",
        sage: "#8AB59A",
        sageGlow: "#A3CFB3",
        coral: "#D49382",

        // shadcn tokens (dark mapping)
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.5" },
          "50%": { transform: "scale(1.18)", opacity: "0.9" },
        },
        breatheSlow: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.3" },
          "50%": { transform: "scale(1.3)", opacity: "0.7" },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.4", filter: "blur(40px)" },
          "50%": { opacity: "0.8", filter: "blur(60px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        breathe: "breathe 6s ease-in-out infinite",
        "breathe-slow": "breatheSlow 9s ease-in-out infinite",
        "float-y": "floatY 6s ease-in-out infinite",
        shimmer: "shimmer 8s linear infinite",
        "glow-pulse": "glowPulse 7s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
