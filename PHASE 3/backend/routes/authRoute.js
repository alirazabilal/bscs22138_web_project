const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

const JWT_SECRET = "alirazabilal";
const JWT_SECRET_ADMIN = "aliraza123";

router.post("/register", async (req, res) => {
  const { name, email, password, phone, role } = req.body;

  try {
    if (role && !["host", "guest"].includes(role)) {
      return res.status(400).json({ message: "Invalid role provided" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      role: role || "guest",
    });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({ message: "Login successful", token, user, role: user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/userdetails/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    });
  } catch (err) {
    console.error("Error fetching user details:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/adminlogin", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email == "admin123@gmail.com" && password == 123) {
      const tokenadmin = jwt.sign(
        { id: 1, email: "admin123@gmail.com" },
        JWT_SECRET_ADMIN,
        {
          expiresIn: "1h",
        }
      );
      res.json({ message: "Login successful", tokenadmin });
      console.log("ADMIN LOGIN PERFORMED...");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
