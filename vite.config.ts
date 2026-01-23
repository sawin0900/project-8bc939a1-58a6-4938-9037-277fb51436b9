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
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Увеличим порог предупреждения (KB) — опционально, но удобно при начальной настройке
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (!id) return;
          if (id.includes("node_modules")) {
            // Разбиваем крупные библиотеки в отдельные чанки
            if (id.includes("framer-motion")) return "vendor_framer";
            if (id.includes("lucide-react") || id.includes("@radix-ui")) return "vendor_ui";
            if (id.includes("@supabase") || id.includes("@tanstack")) return "vendor_data";
            if (id.includes("react") || id.includes("react-dom")) return "vendor_react";
            return "vendor";
          }
        },
      },
    },
  },
}));
