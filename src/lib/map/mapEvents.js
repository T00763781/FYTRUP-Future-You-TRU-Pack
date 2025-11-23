// ------------------------------------------------------------
// mapEvents.js — FYTRUP Alpha10 Location + Recenter Engine
// ------------------------------------------------------------

export async function watchUserLocation(map, updateUserMarker, recenterButton) {
  const L = await import("leaflet");

  let marker = null;

  function placeUser(lat, lng, accuracy) {
    const icon = L.icon({
      iconUrl: "/icons/UserLocation.png",
      iconSize: [36, 36],
      iconAnchor: [18, 18]
    });

    if (!marker) {
      marker = L.marker([lat, lng], { icon }).addTo(map);
    } else {
      marker.setLatLng([lat, lng]);
    }

    updateUserMarker(marker);
  }

  const watchId = navigator.geolocation.watchPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      placeUser(lat, lng);
    },
    (err) => {
      console.warn("GPS error:", err);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 2000,
      timeout: 8000
    }
  );

  recenterButton.addEventListener("click", () => {
    if (marker) {
      map.flyTo(marker.getLatLng(), 17, { duration: 0.9 });
    }
  });

  return () => {
    navigator.geolocation.clearWatch(watchId);
  };
}
