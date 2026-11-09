/// <reference types="vitest/config" />
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  server: { port: 5173 },
  preview: { port: 4173 },
  build: {
    rollupOptions: {
      output: {
        // React and Redux change rarely; a separate vendor chunk stays cached
        // across app deploys.
        manualChunks: {
          vendor: [
            "react",
            "react-dom",
            "react-dom/client",
            "react-router",
            "@reduxjs/toolkit",
            "@reduxjs/toolkit/query/react",
            "react-redux",
          ],
        },
      },
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["src/test/polyfills.ts", "src/test/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    css: false,
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/graphql/__generated__/**", "src/test/**", "src/main.tsx", "src/**/*.d.ts"],
    },
  },
});
