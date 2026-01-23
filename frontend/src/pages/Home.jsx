import { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchFilterBar from "../components/SearchFilterBar";
import RestaurantList from "../components/RestaurantList";
import MapView from "../components/MapView";
import { getRestaurants } from "../services/api";

export default function Home() {
  const [userLocation, setUserLocation] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch helper
  const fetchData = async (lat, lng, sortBy = "distance") => {
    setLoading(true);
    const data = await getRestaurants(lat, lng);

    let sorted = [...data];
    if (sortBy === "rating") {
      sorted.sort((a, b) => b.rating - a.rating);
    } else {
      sorted.sort((a, b) => a.distance - b.distance);
    }

    setRestaurants(sorted);
    setUserLocation({ lat, lng });
    setLoading(false);
  };

  // 🔹 Initial: live location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      fetchData(pos.coords.latitude, pos.coords.longitude);
    });
  }, []);

  return (
    <>
      <Header />

      <SearchFilterBar
        onApply={({ lat, lng, sortBy }) => fetchData(lat, lng, sortBy)}
        onReset={() =>
          navigator.geolocation.getCurrentPosition((pos) =>
            fetchData(pos.coords.latitude, pos.coords.longitude)
          )
        }
      />

      <div className="main-layout">
        <RestaurantList restaurants={restaurants} loading={loading} />
        <MapView userLocation={userLocation} restaurants={restaurants} />
      </div>
    </>
  );
}
