import adapter from "@sveltejs/adapter-static";

export default {
  kit: {
    adapter: adapter(),

    // No base path — Alpha12 runs clean in dev and can be configured later for production.
    paths: {
      base: ""
    },

    prerender: {
      entries: ["*"],
      handleHttpError: "warn"
    },

    // Disable service worker auto-registration behavior.
    serviceWorker: {
      register: false
    }
  }
};
