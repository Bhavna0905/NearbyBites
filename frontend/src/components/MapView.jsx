import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function MapView({ userLocation, restaurants }) {
  if (!userLocation) return null;

  return (
    <div className="map-view" style={{ height: "100%" }}>
      <MapContainer
        center={[userLocation.lat, userLocation.lng]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* ✅ USER MARKER */}
        <Marker position={[userLocation.lat, userLocation.lng]}>
          <Popup>You are here</Popup>
        </Marker>

        {/* ✅ SAFE RESTAURANT MARKERS */}
        {restaurants
          ?.filter(
            r =>
              typeof r.latitude === "number" &&
              typeof r.longitude === "number" &&
              !isNaN(r.latitude) &&
              !isNaN(r.longitude)
          )
          .map(r => (
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
