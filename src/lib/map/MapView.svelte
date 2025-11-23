<!-- ------------------------------------------------------------
     MAPVIEW.SVELTE — FYTRUP Alpha10 Final (Premium Layering)
     GitHub Pages–safe (uses $app/paths base prefix)
------------------------------------------------------------- -->

<script>
  import { onMount, onDestroy } from "svelte";
  import { base } from "$app/paths"; // <-- CRITICAL FOR GH PAGES

  let map;
  let mapContainer;
  let recenterButton;
  let userMarker;

  let initMapCore;
  let initPOIMarkers;
  let watchUserLocation;

  let cleanup = () => {};

  onMount(async () => {
    const core = await import("./mapCore.js");
    const poi = await import("./poiMarkers.js");
    const loc = await import("./mapEvents.js");

    initMapCore = core.initMapCore;
    initPOIMarkers = poi.initPOIMarkers;
    watchUserLocation = loc.watchUserLocation;

    map = await initMapCore(mapContainer);
    initPOIMarkers(map);

    cleanup = watchUserLocation(
      map,
      (newMarker) => (userMarker = newMarker),
      recenterButton
    );
  });

  onDestroy(() => cleanup && cleanup());
</script>

<style>
  /* ------------------------------------------------------------
       PREMIUM LAYERING STACK
       (bottom → top)
       10 = Map tiles
       20 = POI markers
       30 = User marker + accuracy ring
       40 = Recenter button
  ------------------------------------------------------------- */

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

<!-- Recenter Button -->
<div class="recenter-btn" bind:this={recenterButton}>
  <img src="{base}/icons/Recenter.png" alt="recenter" />
</div>
