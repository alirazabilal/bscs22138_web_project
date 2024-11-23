const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  guests: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  images: { type: [String], required: true },
  details: { type: [String] },
  amenities: { type: [String] },
});

const Property = mongoose.model("Property", propertySchema);
module.exports = Property;
