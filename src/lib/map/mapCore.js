// ------------------------------------------------------------
// mapCore.js — FYTRUP Alpha10 Map Core
// ------------------------------------------------------------

export async function initMapCore(container) {
  const L = await import("leaflet");

  // Required Leaflet CSS
  await import("leaflet/dist/leaflet.css");

  // Tile layer URL
  const tileURL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

  const map = L.map(container, {
    zoomControl: false,
    attributionControl: false,
    minZoom: 13,
    maxZoom: 19,
    inertia: true,
    preferCanvas: false
  });

  // TRU fallback center
  const defaultCenter = [50.671, -120.365];

  map.setView(defaultCenter, 16);

  L.tileLayer(tileURL, {
    maxZoom: 19,
    tileSize: 256,
    keepBuffer: 5
  }).addTo(map);

  // avoid first-render white gaps
  setTimeout(() => map.invalidateSize(true), 150);

  return map;
}
