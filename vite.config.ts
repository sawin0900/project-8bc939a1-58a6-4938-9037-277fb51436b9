import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { execSync } from "node:child_process";

const buildDate = new Date().toISOString().slice(0, 10);
const gitCommitHash = (() => {
  try {
    return execSync("git rev-parse --short HEAD").toString().trim();
  } catch {
    return "unknown";
  }
})();

// https://vitejs.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => ({
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
  define: {
    __BUILD_DATE__: JSON.stringify(buildDate),
    __COMMIT_HASH__: JSON.stringify(gitCommitHash),
  },
  ssr: isSsrBuild ? {
    noExternal: ["react-helmet-async"],
  } : undefined,
  build: {
    cssCodeSplit: true,
    rollupOptions: isSsrBuild
      ? undefined
      : {
          output: {
            manualChunks: {
              react: ["react", "react-dom", "react-router-dom", "react-helmet-async"],
              query: ["@tanstack/react-query", "@supabase/supabase-js"],
              ui: ["@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu", "@radix-ui/react-toast"],
              animation: ["framer-motion"],
            },
          },
        },
  },
}));
