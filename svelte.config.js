import adapter from "@sveltejs/adapter-static";
import { base } from "./src/lib/base-path.js";

/**
 * FYTRUP — Alpha12 / GitHub Pages–compatible SvelteKit config
 *
 * - Uses adapter-static for GitHub Pages
 * - Base path is injected dynamically via `src/lib/base-path.js`
 * - Allows GitHub Actions to deploy Alpha12 to a subpath
 * - Keeps local dev clean (`base = ""`)
 */

const config = {
  kit: {
    adapter: adapter(),

    paths: {
      base
    },

    prerender: {
      entries: ["*"],
      handleHttpError: "warn"
    },

    // FYTRUP does not use SvelteKit's default service worker
    serviceWorker: {
      register: false
    }
  }
};

export default config;
