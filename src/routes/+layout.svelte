<!-- ------------------------------------------------------------
     +LAYOUT.SVELTE — FYTRUP Alpha10 ROOT APP SHELL (Final A)
     Purpose:
       • Lock page zoom (map handles zoom)
       • Apply theme before first paint
       • Load global theme CSS
       • Initialize theme logic
       • Render fixed header
       • Render map/camera window (42vh)
       • Render chat region
       • Run splash fade-out
       • Remain SSR-safe
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

  <!-- First-paint theme lock (no white flash) -->
  <script>
    (function () {
      const theme = localStorage.getItem("fytrup-theme") || "tru";
      document.documentElement.setAttribute("data-theme", theme);
    })();
  </script>
</svelte:head>

<script>
  import { onMount, onDestroy } from "svelte";

  /* GLOBAL THEME CSS — required for full-app theming */
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
    // Initialize theme engine (after FP lock)
    initTheme();

    // Subscribe to global app state
    unsubscribe = appState.subscribe((v) => (state = v));

    // Splash fade-out timing
    setTimeout(() => (showSplash = false), 2200);
  });

  onDestroy(() => {
    if (unsubscribe) unsubscribe();
  });
</script>

<style>
  /* ------------------------------------------------------------
       ROOT CONTAINER
       Full-height mobile app shell
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

  /* ------------------------------------------------------------
       FIXED HEADER (top)
------------------------------------------------------------- */
  .layer-header {
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 30;
  }

  /* ------------------------------------------------------------
       MAP WINDOW
       Fixed height: 42vh
       Layer sits between header and chat
------------------------------------------------------------- */
  .layer-map {
    position: absolute;
    top: calc(58px + env(safe-area-inset-top));
    width: 100%;
    height: 42vh;
    overflow: hidden;
    z-index: 10;
  }

  /* ------------------------------------------------------------
       CHAT REGION
       Occupies remaining space below map
------------------------------------------------------------- */
  .layer-chat {
    position: absolute;
    top: calc(58px + env(safe-area-inset-top) + 42vh);
    bottom: 0;
    width: 100%;
    overflow: hidden;
    z-index: 20;
  }

  /* ------------------------------------------------------------
       SPLASH OVERLAY
------------------------------------------------------------- */
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
  <!-- HEADER -->
  <div class="layer-header">
    <Header />
  </div>

  <!-- MAP / CAMERA WINDOW -->
  <div class="layer-map">
    <ModeSwitcher showCamera={state.showCamera} />
  </div>

  <!-- CHAT REGION -->
  <div class="layer-chat">
    <ChatWrapper />
  </div>

  <!-- SPLASH OVERLAY -->
  <div class="layer-splash fade {showSplash ? '' : 'hidden'}">
    <Splash />
  </div>

  <!-- ROUTE SLOT -->
  <slot />
</div>
