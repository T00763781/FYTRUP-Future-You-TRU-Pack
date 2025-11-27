import adapter from "@sveltejs/adapter-static";
import { base } from "./src/lib/base-path.js";

const config = {
  kit: {
    adapter: adapter({
      fallback: "index.html"  // Required for GitHub Pages preview
    }),

    paths: {
      base
    },

    prerender: {
      entries: [],            // Disable auto-prerender (prevents dynamic errors)
      handleHttpError: "warn"
    },

    serviceWorker: {
      register: false
    }
  }
};

export default config;
