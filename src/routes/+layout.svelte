<!-- ------------------------------------------------------------
     +LAYOUT.SVELTE — FYTRUP Alpha10 (Hybrid Camera Mode Compatible)
------------------------------------------------------------- -->

<svelte:head>
  <meta name="viewport"
        content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">

  <script>
    (function () {
      const theme = localStorage.getItem("fytrup-theme") || "tru";
      document.documentElement.setAttribute("data-theme", theme);
    })();
  </script>

  <link rel="manifest" href="{base}/manifest.json">
</svelte:head>

<script>
  import { onMount, onDestroy } from "svelte";
  import { base } from "$app/paths";

  import "$lib/theme/themes.css";
  import { initTheme } from "$lib/theme/store.js";

  import Splash from "$lib/ui/Splash.svelte";
  import Header from "$lib/ui/Header.svelte";
  import ChatWrapper from "$lib/chat/ChatWrapper.svelte";

  import MapView from "$lib/map/MapView.svelte";
  import CameraView from "$lib/camera/CameraView.svelte";

  import { appState, noteEvent } from "$lib/state/appState.js";
  import { classifyNote } from "$lib/qr/classifier.js";

  let showSplash = true;
  let state = {};
  let unsubscribe;

  onMount(() => {
    initTheme();
    unsubscribe = appState.subscribe((v) => (state = v));

    // responsive base type scaling
    {
      const base = 16, min = 15, max = 19;
      const scaled = Math.min(max, Math.max(min, (window.innerWidth / 375) * base));
      document.documentElement.style.fontSize = scaled + "px";
    }

    const hideBar = () => window.scrollTo({ top: 1, behavior: "auto" });

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

  function handleToggleCamera() {
    appState.update((s) => ({ ...s, showCamera: !s.showCamera }));
  }

  function handleQR(event) {
    // Debug print of EXACT QR payload
    console.log("RAW QR SCAN:", JSON.stringify(event.detail));

    // Apply normalization + classification
    const outcome = classifyNote(event.detail);

    // Route classification to system messaging
    noteEvent(outcome);

    // Always close camera after scan
    appState.update((s) => ({ ...s, showCamera: false }));
  }
</script>

<style>
  html, body { touch-action: pan-y; }

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

  /* MAP REGION (static height: 42vh) */
  .layer-map {
    position: absolute;
    top: calc(58px + env(safe-area-inset-top));
    width: 100%;
    height: 42vh;
    overflow: hidden;
    z-index: 10;
    transition: opacity 0.25s ease;
  }

  .dimmed {
    opacity: 0.25;
  }

  /* CAMERA REGION (exactly overlaps map window) */
  .layer-camera {
    position: absolute;
    top: calc(58px + env(safe-area-inset-top));
    width: 100%;
    height: 42vh;
    overflow: hidden;
    z-index: 15;
    transition: opacity 0.25s ease;
    opacity: 0;
    pointer-events: none;
    background: #000;
  }

  .showcam {
    opacity: 1;
    pointer-events: auto;
  }

  /* CHAT REGION (solid background, never transparent) */
  .layer-chat {
    position: absolute;
    top: calc(58px + env(safe-area-inset-top) + 42vh);
    bottom: 0;
    width: 100%;
    overflow: hidden;
    z-index: 20;
    background: var(--bg);
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

  <div class="layer-map {state.showCamera ? 'dimmed' : ''}">
    <MapView />
  </div>

  <div class="layer-camera {state.showCamera ? 'showcam' : ''}">
    <CameraView on:qrResult={handleQR} />
  </div>

  <div class="layer-chat">
    <ChatWrapper
      showCamera={state.showCamera}
      on:toggleCamera={handleToggleCamera}
    />
  </div>

  <div class="layer-splash fade {showSplash ? '' : 'hidden-splash'}">
    <Splash />
  </div>

  <slot />
</div>
