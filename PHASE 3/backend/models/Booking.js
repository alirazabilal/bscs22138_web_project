const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  property: {
    type: String, // Store propertyId as a string
    required: true,
  },
  propertyName: {
    type: String, // Store the property name
    required: true,
  },
  user: {
    type: String, // Store userId as a string (optional)
    required: false,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  guests: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
    enum: ["Pending", "Confirmed", "Cancelled"],
  },
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
