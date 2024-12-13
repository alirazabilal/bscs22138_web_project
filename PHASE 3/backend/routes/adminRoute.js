const express = require("express");
const Listing = require("../models/Listing.js");
const Booking = require("../models/Booking.js");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddlewareHost = require("../middleware/authMiddlewareHost.js");

const router = express.Router();
const JWT_SECRET_HOST = "alirazabilal";

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Not authorized" });
  }
};

// 1. GET /admin/admin/listings - Fetch all listings (admin view)
router.get("/listings", async (req, res) => {
  try {
    const listings = await Listing.find();
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching listings", error });
  }
});

// 2. POST /admin/admin/listings - Add a new listing
router.post("/listings", async (req, res) => {
  try {
    const {
      id,
      image,
      image2,
      image3,
      image4,
      image5,
      title,
      type,
      guests,
      bedrooms,
      bathrooms,
      price,
      rating,
      rating2,
      rating3,
      rating4,
      rating5,
      rating6,
      rating7,
      detail1,
      detail2,
      detail3,
      detail4,
      detail5,
      detail6,
      list1,
      list2,
      list3,
      list4,
      list5,
      list6,
      list7,
      list8,
      list9,
      list10,
    } = req.body;

    const newListing = new Listing({
      id,
      image,
      image2,
      image3,
      image4,
      image5,
      title,
      type,
      guests,
      bedrooms,
      bathrooms,
      price,
      rating,
      rating2,
      rating3,
      rating4,
      rating5,
      rating6,
      rating7,
      detail1,
      detail2,
      detail3,
      detail4,
      detail5,
      detail6,
      list1,
      list2,
      list3,
      list4,
      list5,
      list6,
      list7,
      list8,
      list9,
      list10,
    });
    console.log(req.body);
    await newListing.save();
    res.status(201).json(newListing);
  } catch (error) {
    res.status(500).json({ message: "Error adding listing", error });
  }
});
// . POST /admin/host/listings - Add a new listing
router.post("/host/listings", authMiddlewareHost, async (req, res) => {
  try {
    const {
      id,
      image,
      image2,
      image3,
      image4,
      image5,
      title,
      type,
      guests,
      bedrooms,
      bathrooms,
      price,
      rating,
      rating2,
      rating3,
      rating4,
      rating5,
      rating6,
      rating7,
      detail1,
      detail2,
      detail3,
      detail4,
      detail5,
      detail6,
      list1,
      list2,
      list3,
      list4,
      list5,
      list6,
      list7,
      list8,
      list9,
      list10,
    } = req.body;

    const newListing = new Listing({
      id,
      image,
      image2,
      image3,
      image4,
      image5,
      title,
      type,
      guests,
      bedrooms,
      bathrooms,
      price,
      rating,
      rating2,
      rating3,
      rating4,
      rating5,
      rating6,
      rating7,
      detail1,
      detail2,
      detail3,
      detail4,
      detail5,
      detail6,
      list1,
      list2,
      list3,
      list4,
      list5,
      list6,
      list7,
      list8,
      list9,
      list10,
    });
    console.log(req.body);
    await newListing.save();
    res.status(201).json(newListing);
  } catch (error) {
    res.status(500).json({ message: "Error adding listing", error });
  }
});
// . GET /admin/host/listings - Fetch all listings (host view)
router.get("/host/listings", authMiddlewareHost, async (req, res) => {
  try {
    const listings = await Listing.find();
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching listings", error });
  }
});
router.delete("/host/listings/:id", authMiddlewareHost, async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findOneAndDelete({ id: id });
    console.log(id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting listing", error });
  }
});

// GET /api/host/bookings: View bookings for their listings
router.get("/host/bookings", authMiddlewareHost, async (req, res) => {
  try {
    const hostId = req.user.id;
    console.log("Host ID:", hostId);

    const host = await User.findById(hostId);
    if (!host || host.role !== "host") {
      return res
        .status(403)
        .json({ message: "Access denied. Only hosts can view bookings." });
    }

    console.log("Host Details:", host);

    const bookings = await Booking.find({ user: hostId }).populate(
      "property",
      "propertyName"
    );

    if (!bookings.length) {
      return res
        .status(404)
        .json({ message: "No bookings found for this host." });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching host bookings:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

// 3. DELETE /admin/admin/listings/:id - Delete a listing by ID
router.delete("/listings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findByIdAndDelete(id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting listing", error });
  }
});

router.put("/listings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      image2,
      image3,
      image4,
      image5,
      title,
      type,
      guests,
      bedrooms,
      bathrooms,
      price,
      rating,
      rating2,
      rating3,
      rating4,
      rating5,
      rating6,
      rating7,
      detail1,
      detail2,
      detail3,
      detail4,
      detail5,
      detail6,
      list1,
      list2,
      list3,
      list4,
      list5,
      list6,
      list7,
      list8,
      list9,
      list10,
    } = req.body;

    const updatedListing = await Listing.findByIdAndUpdate(
      id,
      {
        image,
        image2,
        image3,
        image4,
        image5,
        title,
        type,
        guests,
        bedrooms,
        bathrooms,
        price,
        rating,
        rating2,
        rating3,
        rating4,
        rating5,
        rating6,
        rating7,
        detail1,
        detail2,
        detail3,
        detail4,
        detail5,
        detail6,
        list1,
        list2,
        list3,
        list4,
        list5,
        list6,
        list7,
        list8,
        list9,
        list10,
      },
      { new: true }
    );

    if (!updatedListing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.status(200).json(updatedListing);
  } catch (error) {
    res.status(500).json({ message: "Error updating listing", error });
  }
});

// 4. GET /admin/admin/bookings - View all bookings (admin overview)
router.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("property user");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error });
  }
});

module.exports = router;
