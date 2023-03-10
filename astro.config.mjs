import { defineConfig } from "astro/config";

// https://astro.build/config
import react from "@astrojs/react";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://danielx-art.github.io",
  base: "/astro-folio",
  integrations: [react(), tailwind()]
});