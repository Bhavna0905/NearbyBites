const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");

// 🌍 Distance calculator (Haversine)
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// ✅ GET nearby restaurants
router.get("/restaurants", async (req, res) => {
  try {
    const { lat, lng } = req.query;
    if (!lat || !lng) return res.json([]);

    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);

    const data = await Restaurant.find({}).lean();

    const result = data
      .filter(r =>
        !isNaN(parseFloat(r.Latitude)) &&
        !isNaN(parseFloat(r.Longitude))
      )
      .map(r => {
        const latitude = parseFloat(r.Latitude);
        const longitude = parseFloat(r.Longitude);

        return {
          id: r._id,
          name: r["Restaurant Name"] || "Unknown",
          city: r.City || "",
          cuisines: r.Cuisines || "",
          rating: Number(r["Aggregate rating"]) || 0,
          latitude,
          longitude,
          distance: Number(
            getDistance(userLat, userLng, latitude, longitude).toFixed(2)
          )
        };
      })
      .sort((a, b) => a.distance - b.distance);

    res.json(result);
  } catch (err) {
    console.error("API ERROR:", err.message);
    res.json([]);
  }
});

module.exports = router;
