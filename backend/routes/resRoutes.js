const express = require("express");
const router = express.Router();

const restaurants = require("../models/res");

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}


router.get("/restaurants", (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({
      error: "Latitude and Longitude are required"
    });
  }

  const result = restaurants.map(r => ({
    ...r,
    distance: getDistance(
      parseFloat(lat),
      parseFloat(lng),
      r.lat,
      r.lng
    ).toFixed(2)
  }));

  result.sort((a, b) => a.distance - b.distance);

  res.json(result);
});

module.exports = router;
