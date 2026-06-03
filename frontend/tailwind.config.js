/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', "serif"],
        sans: ['"Outfit"', "sans-serif"],
      },
      colors: {
        // Soundlull palette (Organic & Earthy Pastel)
        canvas: "#FAF9F6",
        surface: "#F2EFEB",
        surfaceHover: "#EAE7E1",
        sage: {
          DEFAULT: "#8A9A86",
          dark: "#788774",
          tint: "#F4F6F3",
        },
        rose: {
          DEFAULT: "#D9B8B5",
          dark: "#C9A7A4",
        },
        sand: "#E8DCC4",
        ink: "#2A3229",
        inkSoft: "#5B665A",
        line: "#E3E1DB",

        // shadcn tokens (kept for component compatibility)
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
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
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
          "50%": { transform: "scale(1.15)", opacity: "0.85" },
        },
        breatheSlow: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.35" },
          "50%": { transform: "scale(1.25)", opacity: "0.7" },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        breathe: "breathe 6s ease-in-out infinite",
        "breathe-slow": "breatheSlow 9s ease-in-out infinite",
        "float-y": "floatY 5s ease-in-out infinite",
        "fade-in": "fadeIn 0.8s cubic-bezier(0.16,1,0.3,1) both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
