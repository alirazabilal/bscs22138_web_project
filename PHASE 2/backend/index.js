const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mockData = require("./mockData");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 4000;

const bookings = [];

app.post("/api/bookings", (req, res) => {
  const newBooking = req.body;
  newBooking.id = bookings.length + 1;
  bookings.push(newBooking);

  res.status(201).json(newBooking);
});

app.get("/listings", (req, res) => {
  res.json(mockData);
});

app.get("/", (req, res) => {
  res.send("heyyy");
});
app.listen(PORT, () => {
  console.log("connection ok");
});
