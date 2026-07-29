// Dev/preview only — the site itself is plain HTML, CSS and JavaScript.
// Vercel serves the repository root directly (see vercel.json); no build step required.
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  server: { host: "0.0.0.0", port: 8080, allowedHosts: true },
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        products: resolve(__dirname, "products.html"),
        product: resolve(__dirname, "product.html"),
        specifications: resolve(__dirname, "specifications.html"),
        gradeChart: resolve(__dirname, "grade-chart.html"),
        about: resolve(__dirname, "about.html"),
        contact: resolve(__dirname, "contact.html"),
      },
    },
  },
});
