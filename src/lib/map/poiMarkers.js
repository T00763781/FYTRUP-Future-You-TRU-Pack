// ------------------------------------------------------------
// poiMarkers.js — FYTRUP Alpha10 POI Engine (GitHub-safe)
// ------------------------------------------------------------
import { base } from "$app/paths";   // <-- CRITICAL for GitHub Pages

// Marker icon selector with base path
function iconForState(state) {
  const iconMap = {
    unseen: `${base}/icons/marker_unseen.png`,
    visited: `${base}/icons/marker_visited.png`,
    completed: `${base}/icons/marker_completed.png`
  };
  return iconMap[state] || iconMap.unseen;
}

// Persona avatar lookup (static URLs only, base-prefixed)
const personaPic = {
  wolfie: `${base}/characters/wolfie-icon-neutral.png`,
  atlas:  `${base}/characters/atlas-icon-neutral.png`
};

// POI definitions
const POIS = [
  {
    id: "welcome",
    name: "Welcome Centre",
    latlng: [50.67072620051081, -120.36469120484377],
    persona: "wolfie"
  },
  {
    id: "commons",
    name: "Campus Commons",
    latlng: [50.672409604835615, -120.36502546389116],
    persona: "atlas"
  },
  {
    id: "devoffice",
    name: "Dev Test Office",
    latlng: [50.65937358564882, -120.34439345950946],
    persona: "wolfie"
  }
];

// persistent marker state
function getState(id) {
  return localStorage.getItem("poi-" + id) || "unseen";
}
function saveState(id, state) {
  localStorage.setItem("poi-" + id, state);
}

export async function initPOIMarkers(map) {
  const L = await import("leaflet");

  POIS.forEach((poi) => {
    const state = getState(poi.id);

    // Marker icon
    const icon = L.icon({
      iconUrl: iconForState(state),
      iconSize: [44, 44],
      iconAnchor: [22, 44]
    });

    const marker = L.marker(poi.latlng, { icon }).addTo(map);

    // Popup (persona avatar + title)
    const popupHTML = `
      <div style="display:flex; gap:10px; align-items:center;">
        <img src="${personaPic[poi.persona]}"
             style="width:40px;height:40px;border-radius:50%;" />
        <div>
          <strong>${poi.name}</strong><br/>
          <span style="opacity:.8;font-size:14px;">Tap to explore</span>
        </div>
      </div>
    `;

    marker.bindPopup(popupHTML);

    // State update on tap
    marker.on("click", () => {
      if (state === "unseen") {
        saveState(poi.id, "visited");

        marker.setIcon(
          L.icon({
            iconUrl: iconForState("visited"),
            iconSize: [44, 44],
            iconAnchor: [22, 44]
          })
        );
      }
    });
  });
}
