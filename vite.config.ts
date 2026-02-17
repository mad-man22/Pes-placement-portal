import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    proxy: {
      "/api/jdoodle": {
        target: "https://api.jdoodle.com/v1",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/jdoodle/, ""),
      },
      "/api/leetcode": {
        target: "https://alfa-leetcode-api.onrender.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/leetcode/, ""),
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
