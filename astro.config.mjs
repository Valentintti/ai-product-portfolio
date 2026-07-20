import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://valentintti.github.io",
  base: "/ai-product-portfolio",
  output: "static",
  integrations: [react()],
  build: {
    assets: "assets/build",
  },
});
