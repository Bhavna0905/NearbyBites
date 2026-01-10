const BASE_URL = "http://localhost:5000/api";

export async function getRestaurants(lat, lng) {
  const res = await fetch(
    `${BASE_URL}/restaurants?lat=${lat}&lng=${lng}`
  );

  if (!res.ok) {
    throw new Error("API failed");
  }

  const data = await res.json();
  return Array.isArray(data) ? data : [];
}
