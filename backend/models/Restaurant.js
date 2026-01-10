const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema(
  {},
  {
    collection: "restaurants",
    strict: false
  }
);

module.exports = mongoose.model("Restaurant", RestaurantSchema);
