import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src/"),
    },
  },
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, "./src/package/index.ts"),
      name: "v3hooks",
      fileName: (format) => `v3hooks.${format}.js`,
      formats: ["es"],
    },
    outDir: "dist/lib",
    rollupOptions: {
      external: ["vue"],
      output: {
        format: "es",
        exports: "named",
        globals: {
          vue: "Vue",
        },
      },
    },
    commonjsOptions: {
      esmExternals: true,
    },
  },
});
