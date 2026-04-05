// vite.config.ts
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite' // 이게 있어야 해!

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})