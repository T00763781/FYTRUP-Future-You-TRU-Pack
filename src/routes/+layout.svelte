<!-- ------------------------------------------------------------
     +LAYOUT.SVELTE — FYTRUP Alpha10 ROOT APP SHELL (Final)
     Purpose:
       • Apply theme *before* first paint (no white flash)
       • Load global theme CSS
       • Initialize theme system
       • Render fixed header
       • Render map/camera window (42vh)
       • Render chat region
       • Handle splash overlay
       • SSR-safe state subscription
------------------------------------------------------------- -->

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
    initTheme(); // Hydrates stores — theme is already pre-applied in <head>

    unsubscribe = appState.subscribe((v) => (state = v));

    setTimeout(() => (showSplash = false), 2200);
  });

  onDestroy(() => {
    if (unsubscribe) unsubscribe();
  });
</script>

<!-- ------------------------------------------------------------
     FIRST PAINT PATCH — Runs *before* SvelteKit loads
------------------------------------------------------------- -->
<svelte:head>
  <script>
    try {
      const saved = localStorage.getItem("fytrup-theme") || "tru";
      document.documentElement.dataset.theme = saved;
    } catch (_) {
      document.documentElement.dataset.theme = "tru";
    }
  </script>
</svelte:head>

<style>
  /* ------------------------------------------------------------
       ROOT WRAPPER
       Full-height, safe-area aware, theme-driven
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
       FIXED HEADER
  ------------------------------------------------------------- */
  .layer-header {
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 30;
  }

  /* ------------------------------------------------------------
       MAP WINDOW — 42vh
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
       CHAT REGION — fills remaining space below map
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

  <!-- CHAT BODY -->
  <div class="layer-chat">
    <ChatWrapper />
  </div>

  <!-- SPLASH -->
  <div class="layer-splash fade {showSplash ? '' : 'hidden'}">
    <Splash />
  </div>

  <!-- SVELTEKIT ROUTE SLOT -->
  <slot />

</div>
