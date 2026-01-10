import { useEffect, useState } from "react";
import { getRestaurants } from "../services/api";

export default function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const data = await getRestaurants(
            pos.coords.latitude,
            pos.coords.longitude
          );

          if (!Array.isArray(data)) {
            throw new Error("Invalid API response");
          }

          setRestaurants(data);
        } catch (err) {
          setError("Failed to load restaurants");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Location permission denied");
        setLoading(false);
      }
    );
  }, []);

  if (loading) return <p>Loading restaurants...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="restaurant-list">
      {restaurants.length === 0 && <p>No restaurants found</p>}

      {restaurants.map((r) => (
        <div key={r.id} className="restaurant-card">
          <h3>{r.name}</h3>
          <p>⭐ {r.rating}</p>
          <p>{r.city}</p>
          <p>{r.distance} km away</p>
        </div>
      ))}
    </div>
  );
}
