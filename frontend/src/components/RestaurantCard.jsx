import { Link } from "react-router-dom";

export default function RestaurantCard({ restaurant }) {
  return (
    <Link to={`/restaurant/${restaurant.id}`} className="card">
      <h3>{restaurant.name}</h3>
      <p>⭐ {restaurant.rating}</p>
      <p>📍 {restaurant.location}</p>
      <p>📏 {restaurant.distance} km</p>
    </Link>
  );
}
