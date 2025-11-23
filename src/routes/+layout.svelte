<!-- ------------------------------------------------------------
     +LAYOUT.SVELTE — FYTRUP Alpha10 (Final RFS + Zoom Lock)
------------------------------------------------------------- -->

<svelte:head>
  <!-- Canonical viewport — REQUIRED for mobile zoom lock -->
  <meta name="viewport"
        content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
  
  <!-- First-paint theme lock -->
  <script>
    (function () {
      const theme = localStorage.getItem("fytrup-theme") || "tru";
      document.documentElement.setAttribute("data-theme", theme);
    })();
  </script>
</svelte:head>

<script>
  import { onMount, onDestroy } from "svelte";

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

    // ------------------------------------------------------------
    // ROOT FONT SCALING (RFS hybrid, hydrated for reliability)
    // ------------------------------------------------------------
    {
      const base = 16; // desktop
      const min = 15; // small phones
      const max = 19; // large phones

      const width = window.innerWidth;
      const scaled = Math.min(max, Math.max(min, (width / 375) * base));

      document.documentElement.style.fontSize = scaled + "px";
    }

    // Splash fade
    setTimeout(() => (showSplash = false), 2200);
  });

  onDestroy(() => unsubscribe && unsubscribe());
</script>

<style>
  /* ------------------------------------------------------------
     GLOBAL ANTI-ZOOM FOR CHAT/SCROLL REGIONS
  ------------------------------------------------------------- */
  html, body {
    touch-action: pan-y;
  }

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

  .layer-header {
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 30;
  }

  .layer-map {
    position: absolute;
    top: calc(58px + env(safe-area-inset-top));
    width: 100%;
    height: 42vh;
    overflow: hidden;
    z-index: 10;
  }

  .layer-chat {
    position: absolute;
    top: calc(58px + env(safe-area-inset-top) + 42vh);
    bottom: 0;
    width: 100%;
    overflow: hidden;
    z-index: 20;
  }

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
  <div class="layer-header"><Header /></div>

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
