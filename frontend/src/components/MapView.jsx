import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";

/* 🔁 Map Center Updater */
function ChangeView({ center }) {
  const map = useMap();

  useEffect(() => {
    if (center?.lat && center?.lng) {
      map.setView([center.lat, center.lng], 13);
    }
  }, [center, map]);

  return null;
}

export default function MapView({ userLocation, restaurants }) {
  if (!userLocation) return null;

  return (
    <div className="map-view" style={{ height: "100%" }}>
      <MapContainer
        center={[userLocation.lat, userLocation.lng]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        {/* 🔥 THIS IS THE FIX */}
        <ChangeView center={userLocation} />

        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* 👤 User marker */}
        <Marker position={[userLocation.lat, userLocation.lng]}>
          <Popup>You are here</Popup>
        </Marker>

        {/* 🍽️ Restaurants */}
        {restaurants.map((r) => (
          <Marker
            key={r.id}
            position={[r.latitude, r.longitude]}
          >
            <Popup>
              <strong>{r.name}</strong><br />
              ⭐ {r.rating}<br />
              📍 {r.distance} km
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
