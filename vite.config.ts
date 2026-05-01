import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  resolve: {
    alias: {
      "@queries": path.resolve(__dirname, "src/queries"),
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@services": path.resolve(__dirname, "src/services"),
      "@context": path.resolve(__dirname, "src/context"),
      "@archetypes": path.resolve(__dirname, "src/archetypes"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@icons": path.resolve(__dirname, "src/icons"),
      "@constant": path.resolve(__dirname, "src/constant"),
      "@schema": path.resolve(__dirname, "src/schema"),
      "@dialog": path.resolve(__dirname, "src/dialog"),
    },
  },
})
