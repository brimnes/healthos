import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular"]
      },
      colors: {
        border: "var(--border)",
        bg: "var(--bg)",
        surface: "var(--surface)",
        muted: "var(--muted)",
        text: "var(--text)",
        faint: "var(--faint)",
        accent: "var(--accent)",
        "accent-soft": "var(--accent-soft)"
      }
    }
  },
  plugins: []
};

export default config;
