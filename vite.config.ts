import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Desplegado en Netlify, servido desde la raíz del dominio.
  base: '/',
  plugins: [react(), tailwindcss()],
})
