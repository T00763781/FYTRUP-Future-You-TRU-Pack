<!-- ------------------------------------------------------------
     MAPVIEW.SVELTE — FYTRUP Alpha10 (Persistent Map + Store Invalidate)
     • Survives camera toggle 100% reliably
     • Calls map.invalidateSize() when showCamera → false
     • Still uses GH-Pages-safe asset paths via $app/paths
------------------------------------------------------------- -->

<script>
  import { onMount, onDestroy } from "svelte";
  import { base } from "$app/paths";
  import { appState } from "$lib/state/appState.js";

  let map;
  let mapContainer;
  let recenterButton;
  let userMarker;

  let initMapCore;
  let initPOIMarkers;
  let watchUserLocation;

  // teardown
  let cleanup = () => {};

  // store subscription
  let state = {};
  const unsub = appState.subscribe((v) => {
    state = v;

    // ------------------------------------------------------------
    // THE FIX:
    // When camera turns OFF (showCamera = false), map becomes visible.
    // Leaflet must be invalidated after a frame.
    // ------------------------------------------------------------
    if (map && v.showCamera === false) {
      requestAnimationFrame(() => map.invalidateSize(true));
    }
  });

  onMount(async () => {
    const core = await import("./mapCore.js");
    const poi = await import("./poiMarkers.js");
    const loc = await import("./mapEvents.js");

    initMapCore = core.initMapCore;
    initPOIMarkers = poi.initPOIMarkers;
    watchUserLocation = loc.watchUserLocation;

    // init map
    map = await initMapCore(mapContainer);
    initPOIMarkers(map);

    // location watcher
    try {
      const result = watchUserLocation(
        map,
        (m) => (userMarker = m),
        recenterButton
      );
      cleanup = typeof result === "function" ? result : () => {};
    } catch (err) {
      console.warn("FYTRUP: watchUserLocation failed:", err);
      cleanup = () => {};
    }

    // safety: ensure first paint is correct
    setTimeout(() => map.invalidateSize(true), 150);
  });

  onDestroy(() => {
    unsub();
    try {
      cleanup();
    } catch (err) {
      console.warn("FYTRUP: Map cleanup skipped:", err);
    }
  });
</script>

<style>
  .map-shell {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 10;
  }

  :global(.leaflet-container) {
    width: 100% !important;
    height: 100% !important;
    z-index: 10;
    touch-action: pan-x pan-y pinch-zoom;
  }

  :global(.leaflet-marker-icon) {
    z-index: 20 !important;
  }

  :global(path.leaflet-interactive) {
    z-index: 30 !important;
  }

  :global(.fytrup-user-marker) {
    z-index: 30 !important;
  }

  .recenter-btn {
    position: absolute;
    right: 12px;
    bottom: 12px;

    width: 46px;
    height: 46px;
    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;

    background: rgba(0, 0, 0, 0.42);
    backdrop-filter: blur(7px);

    cursor: pointer;
    z-index: 40;

    box-shadow: 0 2px 6px rgba(0,0,0,0.4);
    transition: transform .15s ease;
  }

  .recenter-btn:active {
    transform: scale(0.92);
  }

  .recenter-btn img {
    width: 20px;
    height: 20px;
    opacity: 0.95;
  }
</style>

<div class="map-shell" bind:this={mapContainer}></div>

<div class="recenter-btn" bind:this={recenterButton}>
  <img src={`${base}/icons/Recenter.png`} alt="recenter" />
</div>
