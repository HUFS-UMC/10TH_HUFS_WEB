import type { Config } from "tailwindcss";

export default {
  darkMode: "class", // 👈 이거 핵심 (없으면 다크모드 안됨)
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;