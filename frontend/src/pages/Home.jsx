import { useEffect, useState } from "react";
import Header from "../components/Header";
import RestaurantList from "../components/RestaurantList";
import MapView from "../components/MapView";
import { getRestaurants } from "../services/api";

export default function Home() {
  const [userLoc, setUserLoc] = useState(null);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      setUserLoc({ lat, lng });

      const data = await getRestaurants(lat, lng);
      setRestaurants(data);
    });
  }, []);

  return (
    <>
      <Header />
      <div className="main-layout">
        <RestaurantList restaurants={restaurants} />
        <MapView userLocation={userLoc} restaurants={restaurants} />
      </div>
    </>
  );
}
