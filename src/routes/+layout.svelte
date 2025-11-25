<!-- ------------------------------------------------------------
     +LAYOUT.SVELTE — FYTRUP Alpha10 (Persistent Map + Camera Overlay)
------------------------------------------------------------- -->

<svelte:head>
  <meta name="viewport"
        content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">

  <!-- First-paint theme lock -->
  <script>
    (function () {
      const theme = localStorage.getItem("fytrup-theme") || "tru";
      document.documentElement.setAttribute("data-theme", theme);
    })();
  </script>

  <link rel="manifest" href="%sveltekit.assets%/manifest.json">
</svelte:head>

<script>
  import { onMount, onDestroy } from "svelte";

  import "$lib/theme/themes.css";
  import { initTheme } from "$lib/theme/store.js";

  import Splash from "$lib/ui/Splash.svelte";
  import Header from "$lib/ui/Header.svelte";
  import ChatWrapper from "$lib/chat/ChatWrapper.svelte";

  import MapView from "$lib/map/MapView.svelte";
  import CameraView from "$lib/camera/CameraView.svelte";

  import { appState, noteEvent } from "$lib/state/appState.js";

  let showSplash = true;
  let state = {};
  let unsubscribe;

  onMount(() => {
    initTheme();
    unsubscribe = appState.subscribe((v) => (state = v));

    /* ----------------------------
       ROOT FONT SCALING (RFS)
    ----------------------------- */
    {
      const base = 16;
      const min = 15;
      const max = 19;

      const w = window.innerWidth;
      const scaled = Math.min(max, Math.max(min, (w / 375) * base));
      document.documentElement.style.fontSize = scaled + "px";
    }

    /* ----------------------------
       AUTO URL-BAR HIDE
    ----------------------------- */
    const hideBar = () => {
      window.scrollTo({ top: 1, behavior: "auto" });
    };

    setTimeout(() => {
      showSplash = false;

      setTimeout(() => {
        hideBar();
        setTimeout(hideBar, 50);
        setTimeout(hideBar, 250);
      }, 100);

    }, 2200);
  });

  onDestroy(() => unsubscribe && unsubscribe());

  /* ------------------------------------------------------------
     CAMERA TOGGLE (from ChatWrapper)
  ------------------------------------------------------------- */
  function handleToggleCamera() {
    appState.update((s) => ({ ...s, showCamera: !s.showCamera }));
  }

  /* ------------------------------------------------------------
     QR RESULT ROUTING (from ChatWrapper)
  ------------------------------------------------------------- */
  function handleQR(event) {
    const type = event.detail; 
    noteEvent(type);
  }
</script>

<style>
  html, body {
    touch-action: pan-y;
  }

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

  /* CAMERA OVERLAY — sits above map, invisible when not active */
  .layer-camera {
    position: absolute;
    top: calc(58px + env(safe-area-inset-top));
    width: 100%;
    height: 42vh;
    overflow: hidden;
    z-index: 15;
    transition: opacity 0.25s ease;
  }

  .hidden {
    opacity: 0;
    pointer-events: none;
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

  .hidden-splash {
    opacity: 0;
    pointer-events: none;
  }
</style>

<div class="app-root">
  
  <div class="layer-header">
    <Header />
  </div>

  <!-- MAP ALWAYS MOUNTED -->
  <div class="layer-map">
    <MapView />
  </div>

  <!-- CAMERA OVERLAY (visibility controlled by CSS) -->
  <div class="layer-camera {state.showCamera ? '' : 'hidden'}">
    <CameraView />
  </div>

  <!-- CHAT -->
  <div class="layer-chat">
    <ChatWrapper
      showCamera={state.showCamera}
      on:toggleCamera={handleToggleCamera}
      on:qrResult={handleQR}
    />
  </div>

  <div class="layer-splash fade {showSplash ? '' : 'hidden-splash'}">
    <Splash />
  </div>

  <slot />
</div>
