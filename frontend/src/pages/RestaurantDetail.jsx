import { useParams } from "react-router-dom";

export default function RestaurantDetail() {
  const { id } = useParams();

  return (
    <div style={{ padding: "20px" }}>
      <h2>🍽️ Restaurant {id}</h2>
      <p>Menu items will come here</p>
      <p>⭐ Reviews section</p>
    </div>
  );
}
