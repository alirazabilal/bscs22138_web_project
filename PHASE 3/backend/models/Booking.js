const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  property: {
    type: String,
    required: true,
  },
  propertyName: {
    type: String,
    required: true,
  },
  user: {
    type: String,
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
