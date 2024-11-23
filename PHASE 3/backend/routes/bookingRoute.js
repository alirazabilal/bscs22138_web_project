const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Listing = require("../models/Listing");
const User = require("../models/User");
const authenticate = require("../middleware/authMiddleware.js"); //(empty) I WILL WRITE THESE LATER
const authenticateAdmin = require("../middleware/authMiddlewareAdmin.js"); //(empty) I WILL WRITE THESE LATER

router.post("/bookings", authenticate, async (req, res) => {
  const {
    propertyId,
    propertyName,
    checkInDate,
    checkOutDate,
    numGuests,
    phoneNumber,
    countryCode,
    totalPrice,
  } = req.body;

  console.log("Request Body: ", req.body);

  try {
    const listing = await Listing.findById(propertyId);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newBooking = new Booking({
      property: propertyId,
      propertyName: propertyName,
      user: req.user.id,
      checkIn: new Date(checkInDate),
      checkOut: new Date(checkOutDate),
      totalPrice: totalPrice,
      guests: numGuests,
      status: "Pending",
    });

    await newBooking.validate();

    await newBooking.save();

    user.bookings.push(newBooking._id);
    await user.save();

    res.status(201).json(newBooking);
  } catch (error) {
    console.error("Error saving booking:", error);
    res.status(500).json({ error: "Failed to save booking." });
  }
});
router.get("/bookings", authenticateAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find();

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found" });
    }
    console.log(bookings);
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error retrieving bookings:", error);
    res.status(500).json({ error: "Failed to retrieve bookings." });
  }
});

module.exports = router;
