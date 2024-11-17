const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mockData = require("./mockData");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 4000;

const bookings = [];

const bookingsFilePath = path.join(__dirname, "bookings.txt");

app.post("/api/bookings", (req, res) => {
  const newBooking = req.body;

  const bookingText = `
    Property ID: ${newBooking.propertyId}
    Property Title: ${newBooking.propertyName}
    Check-in Date: ${newBooking.checkInDate}
    Check-out Date: ${newBooking.checkOutDate}
    Number of Guests: ${newBooking.numGuests}
    Phone Number: ${newBooking.phoneNumber}
    Country Code: ${newBooking.countryCode}
    Total Price: ${newBooking.totalPrice}
    ---------------------------------------------------
  `;

  fs.appendFile(bookingsFilePath, bookingText, (err) => {
    if (err) {
      console.error("Error saving booking data to file:", err);
      return res.status(500).json({ error: "Failed to save booking." });
    }

    res.status(201).json(newBooking);
  });
});

// app.post("/api/bookings", (req, res) => {
//   const newBooking = req.body;
//   newBooking.id = bookings.length + 1;
//   bookings.push(newBooking);

//   res.status(201).json(newBooking);
// });

app.get("/listings", (req, res) => {
  res.json(mockData);
});

app.get("/listings/search", (req, res) => {
  const query = req.query.query ? req.query.query.toLowerCase() : "";

  const filteredListings = mockData.filter((listing) =>
    listing.title.toLowerCase().includes(query)
  );

  res.json(filteredListings);
});
app.get("/listings/:id", (req, res) => {
  const lId = req.params.id;
  const parsedLId = parseInt(lId, 10);
  const listing = mockData.find((item) => item.id === parsedLId);

  if (listing) {
    res.json(listing);
  } else {
    res.status(404).json({ error: "NOT FOUND ITEM" });
  }
});
app.get("/", (req, res) => {
  res.send("heyyy");
});
app.listen(PORT, () => {
  console.log("connection ok");
});
