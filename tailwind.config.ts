import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
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
        orange: {
          main: "#F79F08"
        },
        yellow: {
          light: "#FFF6E6"
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "spin-forward": {
          from: {
            transform: 'rotate(0deg)',
          },
          to: {
            transform: 'rotate(60deg)',
          }
        },
        "spin-backward": {
          from: {
            transform: 'rotate(60deg)',
          },
          to: {
            transform: 'rotate(0deg)',
          }
        },
        'slideIn': {
          '0%': { maxHeight: '0', opacity: '0' },
          '100%': { maxHeight: '500px', opacity: '1'},
        }, 
        'slideOut': {
          '0%': { maxHeight: '500px', opacity: '1' },
          '100%': { maxHeight: '0', opacity: '0'},
        }, 
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "spin-forward": "spin-forward 0.3s linear",
        "spin-backward": "spin-backward 0.3s linear",
        'slideIn': 'slideIn 300ms ease-in-out',
        'slideOut': 'slideOut 300ms ease-in-out',
      },
      boxShadow: {
        'block-shadow': '8px 10px 0px 0 rgba(0, 0, 0, 1)',
      },
      transitionProperty: {
        'transform-shadow': 'transform, box-shadow ease 0.5s'
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config