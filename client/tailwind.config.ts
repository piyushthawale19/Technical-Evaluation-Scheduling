import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#f8fafc",
        surface: "#f8fafc",
        "surface-strong": "#ffffff",
        primary: "#2563eb",
        success: "#10b981",
        warning: "#f59e0b",
        danger: "#ef4444",
        muted: "#64748b",
        border: "#e2e8f0",
        ink: "#0f172a",
        panel: "#ffffff",
        soft: "#eff6ff",
        card: "#ffffff",
        foreground: "#0f172a",
        "muted-foreground": "#475569",
        "primary-foreground": "#ffffff",
      },
      boxShadow: {
        panel: "0 10px 30px -20px rgba(15, 23, 42, 0.35)",
        soft: "0 10px 30px -15px rgba(15, 23, 42, 0.25)",
        lift: "0 18px 50px -20px rgba(15, 23, 42, 0.32)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
