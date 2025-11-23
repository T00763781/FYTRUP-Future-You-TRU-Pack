<!-- ------------------------------------------------------------
     +LAYOUT.SVELTE — FYTRUP Alpha10 ROOT APP SHELL (Final A+RFS)
     Purpose:
       • Lock page zoom (map handles zoom)
       • Apply theme before first paint
       • Load global theme CSS
       • Initialize theme logic
       • Install Root Font Scaling (RFS hybrid)
       • Render fixed header
       • Render map/camera window (42vh)
       • Render chat region
       • Run splash fade-out
------------------------------------------------------------- -->

<svelte:head>
  <!-- Prevent page-level zoom; allow internal map zoom -->
  <meta
    name="viewport"
    content="width=device-width,
             initial-scale=1.0,
             maximum-scale=1.0,
             user-scalable=no"
  />

  <!-- First-paint theme lock -->
  <script>
    (function () {
      const theme = localStorage.getItem("fytrup-theme") || "tru";
      document.documentElement.setAttribute("data-theme", theme);
    })();

    /* --------------------------------------------
       Root Font Scaling (RFS hybrid)
       - Scales to device width using clamp()
       - Insulates against extremely small or huge phones
       - Every rem inside the app now adapts visually
    --------------------------------------------- */
    (function () {
      const base = 16; // desktop baseline
      const min = 15;  // mobile minimum
      const max = 18;  // large phones/tablets

      const width = window.innerWidth;
      const scaled = Math.min(
        max,
        Math.max(min, (width / 375) * base)
      );

      document.documentElement.style.fontSize = scaled + "px";
    })();
  </script>
</svelte:head>

<script>
  import { onMount, onDestroy } from "svelte";

  /* GLOBAL THEME CSS */
  import "$lib/theme/themes.css";

  import { initTheme } from "$lib/theme/store.js";

  import Splash from "$lib/ui/Splash.svelte";
  import Header from "$lib/ui/Header.svelte";
  import ModeSwitcher from "$lib/ui/ModeSwitcher.svelte";
  import ChatWrapper from "$lib/chat/ChatWrapper.svelte";

  import { appState } from "$lib/state/appState.js";

  let showSplash = true;
  let state = {};
  let unsubscribe;

  onMount(() => {
    initTheme();
    unsubscribe = appState.subscribe((v) => (state = v));

    // Splash fade
    setTimeout(() => (showSplash = false), 2200);
  });

  onDestroy(() => {
    if (unsubscribe) unsubscribe();
  });
</script>

<style>
  /* ------------------------------------------------------------
       ROOT
  ------------------------------------------------------------- */
  .app-root {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;

    background: var(--bg);
    color: var(--text);

    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
  }

  /* HEADER */
  .layer-header {
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 30;
  }

  /* MAP WINDOW */
  .layer-map {
    position: absolute;
    top: calc(58px + env(safe-area-inset-top));
    width: 100%;
    height: 42vh;
    overflow: hidden;
    z-index: 10;
  }

  /* CHAT REGION */
  .layer-chat {
    position: absolute;
    top: calc(58px + env(safe-area-inset-top) + 42vh);
    bottom: 0;
    width: 100%;
    overflow: hidden;
    z-index: 20;
  }

  /* SPLASH */
  .layer-splash {
    position: absolute;
    inset: 0;
    z-index: 40;
  }

  .fade {
    transition: opacity 0.6s ease;
  }
  .hidden {
    opacity: 0;
    pointer-events: none;
  }
</style>

<div class="app-root">
  <div class="layer-header">
    <Header />
  </div>

  <div class="layer-map">
    <ModeSwitcher showCamera={state.showCamera} />
  </div>

  <div class="layer-chat">
    <ChatWrapper />
  </div>

  <div class="layer-splash fade {showSplash ? '' : 'hidden'}">
    <Splash />
  </div>

  <slot />
</div>
