const express = require("express");
const mongoose = require("mongoose");
const Listing = require("../models/Listing");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch listings" });
  }
});

router.get("/search", async (req, res) => {
  const query = req.query.query ? req.query.query.toLowerCase() : "";

  try {
    const filteredListings = await Listing.find({
      title: { $regex: query, $options: "i" },
    });
    res.json(filteredListings);
  } catch (error) {
    res.status(500).json({ error: "Failed to search listings" });
  }
});

router.get("/:id", async (req, res) => {
  const lId = parseInt(req.params.id, 10);
  try {
    const listing = await Listing.findOne({ id: lId });

    if (listing) {
      res.json(listing);
    } else {
      res.status(404).json({ error: "Listing not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch listing" });
  }
});

router.delete("/:id", async (req, res) => {
  const lId = parseInt(req.params.id, 10);
  try {
    const result = await Listing.deleteOne({ id: lId });

    if (result.deletedCount > 0) {
      res.json({ message: "Listing successfully deleted" });
    } else {
      res.status(404).json({ error: "Listing not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete listing" });
  }
});

module.exports = router;
