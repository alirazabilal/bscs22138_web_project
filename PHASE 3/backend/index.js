const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mockData = require("./mockData.js");
const fs = require("fs");
const path = require("path");

const bookingRoute = require("./routes/bookingRoute.js");
const listingRoute = require("./routes/listingRoute.js");
const authRoute = require("./routes/authRoute.js");
const adminRoute = require("./routes/adminRoute.js");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 4000;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

const bookings = [];

const bookingsFilePath = path.join(__dirname, "bookings.txt");

app.use("/api", bookingRoute);

app.use("/listings", listingRoute);

app.use("/auth", authRoute);

app.use("/admin", adminRoute);

app.get("/", (req, res) => {
  res.send("heyyy");
});
app.listen(PORT, () => {
  console.log("connection ok");
});
