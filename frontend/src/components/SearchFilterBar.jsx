import { useState } from "react";

export default function SearchFilterBar({ onApply, onReset }) {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [sortBy, setSortBy] = useState("distance");

  return (
    <div className="search-filter">
      <h3>🔍 Search & Filter Restaurants</h3>

      <input
        placeholder="Latitude (e.g. 26.9124)"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
      />

      <input
        placeholder="Longitude (e.g. 75.7873)"
        value={lng}
        onChange={(e) => setLng(e.target.value)}
      />

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="distance">Distance</option>
        <option value="rating">Rating</option>
      </select>

      <div className="actions">
        <button
          onClick={() =>
            onApply({
              lat: Number(lat),
              lng: Number(lng),
              sortBy
            })
          }
        >
          Apply
        </button>

        <button className="secondary" onClick={onReset}>
          Reset to My Location
        </button>
      </div>
    </div>
  );
}
