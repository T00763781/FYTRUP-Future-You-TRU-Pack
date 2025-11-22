----------- FILE: svelte.config.js (BEGIN) -----------
import adapter from "@sveltejs/adapter-static";

const dev = process.env.NODE_ENV === "development";

export default {
  kit: {
    adapter: adapter(),

    // Base path for GitHub Pages project site
    paths: {
      base: dev ? "" : "/FYTRUP-alpha10"
    },

    prerender: {
      handleHttpError: "warn"
    }
  }
};
----------- FILE: svelte.config.js (END) -----------
