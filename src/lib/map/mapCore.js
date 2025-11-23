// ------------------------------------------------------------
// mapCore.js — FYTRUP Alpha10 Map Core (Final Build)
// • SSR-safe dynamic Leaflet import
// • GitHub Pages compatible (uses no absolute / URLs)
// • Stable tile loading
// • Strong mobile behaviour (inertia tuned, no bounce)
// • Initial center: TRU campus (recenter updated via GPS)
// ------------------------------------------------------------

export async function initMapCore(container) {
  const L = await import("leaflet");
  await import("leaflet/dist/leaflet.css");

  // Use OpenStreetMap tiles
  const tileURL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

  // Create map instance
  const map = L.map(container, {
    zoomControl: false,           // our UI is clean, no default controls
    attributionControl: false,    // hidden to prevent UI clutter
    minZoom: 13,
    maxZoom: 19,
    inertia: true,
    inertiaDeceleration: 3400,    // smoother mobile panning
    wheelDebounceTime: 40,        // prevents jitter on trackpads
    preferCanvas: false
  });

  // Default TRU campus fallback (first render)
  const defaultCenter = [50.671, -120.365];
  const defaultZoom = 16;

  map.setView(defaultCenter, defaultZoom);

  // Add tile layer
  L.tileLayer(tileURL, {
    maxZoom: 19,
    tileSize: 256,
    keepBuffer: 6,                // keep off-screen tiles for smoother pan
    updateWhenIdle: false,
    updateWhenZooming: true
  }).addTo(map);

  // Fix: avoid initial white gaps on first paint
  setTimeout(() => map.invalidateSize(true), 200);

  return map;
}
