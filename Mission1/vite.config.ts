// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // 또는 @vitejs/api-react
import tailwindcss from '@tailwindcss/vite' // 1. 이거 추가!

export default defineConfig({
  plugins: [
    tailwindcss(), // 2. 여기에 함수 형태로 추가 (반드시 react() 보다 앞에 두는 걸 추천)
    react(),
  ],
})