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

  const [sortBy, setSortBy] = useState("distance");
  const [radius, setRadius] = useState(10);

  const fetchData = async (lat, lng) => {
    setLoading(true);

    const data = await getRestaurants(lat, lng);

    const nearby = data.filter((r) => r.distance <= radius);

    let sorted = [...nearby];
    if (sortBy === "rating") {
      sorted.sort((a, b) => b.rating - a.rating);
    } else {
      sorted.sort((a, b) => a.distance - b.distance);
    }

    setRestaurants(sorted);
    setUserLocation({ lat, lng });
    setLoading(false);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      fetchData(pos.coords.latitude, pos.coords.longitude);
    });
  }, []);

  useEffect(() => {
    if (userLocation) {
      fetchData(userLocation.lat, userLocation.lng);
    }
  }, [sortBy, radius]);

  return (
    <>
      <Header
        sortBy={sortBy}
        onSortChange={setSortBy}
        radius={radius}
        onRadiusChange={setRadius}
      />

      <SearchFilterBar
        onApply={({ lat, lng }) => fetchData(lat, lng)}
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
