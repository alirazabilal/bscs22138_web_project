const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  isHost: { type: Boolean, default: false },
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }], // User's bookings
  listings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Listing" }], // For hosts (now referring to Listing)
});

const User = mongoose.model("User", userSchema);
module.exports = User;
