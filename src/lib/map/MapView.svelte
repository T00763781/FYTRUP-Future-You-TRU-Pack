<!-- ------------------------------------------------------------
     MAPVIEW.SVELTE — FYTRUP Alpha10
     SSR-safe Leaflet dynamic loader
------------------------------------------------------------- -->

<script>
  import { onMount } from "svelte";

  let mapEl;       // DOM node for Leaflet map
  let map;         // Leaflet instance

  onMount(async () => {
    // guard: DOM only
    if (!mapEl) return;

    // dynamic import — REQUIRED for SSR safety
    const L = await import("leaflet");

    // Leaflet default CSS (also loaded dynamically)
    await import("leaflet/dist/leaflet.css");

    // Create map instance
    map = L.map(mapEl, {
      zoomControl: false,
      attributionControl: false
    }).setView([50.675, -120.338], 16);

    // Tile layer
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19
    }).addTo(map);
  });
</script>

<style>
  .map-area {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #003e51;
  }
</style>

<div class="map-area" bind:this={mapEl}></div>
