import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 1. 불러오기

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 2. 실행하기
  ],
})