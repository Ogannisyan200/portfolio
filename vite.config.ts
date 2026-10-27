import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// PREVIEW=1 собирает один HTML-файл с вшитыми JS/CSS (картинки остаются файлами рядом).
// Обычная сборка (npm run build) даёт обычный сайт для Vercel / GitHub Pages.
const preview = !!process.env.PREVIEW

export default defineConfig({
  base: './',
  plugins: [react(), ...(preview ? [viteSingleFile()] : [])],
})
