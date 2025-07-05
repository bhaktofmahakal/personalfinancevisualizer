/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        
        // Chart colors from task.md
        chart: {
          amber: "#C46C45",
          sapphire: "#2C5DA9",
          lavender: "#5F4B8B",
        },
        
        // Additional palette colors
        palette: {
          // Noir Lavender
          noir: {
            dark: "#0D0D0D",
            medium: "#5F4B8B",
            light: "#CBBBF6",
          },
          // Sapphire Drift
          sapphire: {
            dark: "#0A0F3C",
            medium: "#2C5DA9",
            light: "#C8DAF9",
          },
          // Pine Fog
          pine: {
            dark: "#1F2A24",
            medium: "#5B7768",
            light: "#DAE3D7",
          },
          // Mauve Satin
          mauve: {
            dark: "#2B2B2B",
            medium: "#A593E0",
            light: "#DCD6F7",
          },
          // Amber Frost
          amber: {
            dark: "#402E32",
            medium: "#C46C45",
            light: "#FFE6D6",
          },
          // Velvet Sunset
          velvet: {
            dark: "#3F1D38",
            medium: "#AF5279",
            light: "#FFD6A5",
          },
          // Crimson Smoke
          crimson: {
            dark: "#3B0A0A",
            medium: "#8A2B2B",
            light: "#F2C9C9",
          },
          // Golden Bloom
          golden: {
            dark: "#4D3F29",
            medium: "#C49A6C",
            light: "#FFF3D1",
          },
          // Ivory Mint
          ivory: {
            dark: "#96C7B9",
            medium: "#D1F0E0",
            light: "#FFFFFF",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}