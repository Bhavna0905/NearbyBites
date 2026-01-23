export default function RestaurantList({ restaurants, loading }) {
  if (loading) return <p>Loading...</p>;

  return (
    <div className="restaurant-list">
      <h3>Nearby Restaurants</h3>

      {restaurants.length === 0 && <p>No restaurants found</p>}

      {restaurants.map((r) => (
        <div key={r.id} className="restaurant-card">
          <strong>{r.name}</strong>
          <p>⭐ {r.rating}</p>
          <p>{r.city}</p>
          <p>{r.distance} km away</p>
        </div>
      ))}
    </div>
  );
}
