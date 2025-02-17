import path from "path"
import { reactRouter } from "@react-router/dev/vite";
// import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vite"
 
export default defineConfig({
  plugins: [ reactRouter(), svgr(),],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "~": path.resolve(__dirname, "./public"),
    },
  },
})