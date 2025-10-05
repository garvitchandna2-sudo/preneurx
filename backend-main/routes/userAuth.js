const express = require("express");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET; 
// Universal Login Route
router.post("/login", async (req, res) => {
  const { mobile, dob } = req.body;

  try {
    // Try Student first
    let user = await Student.findOne({ mobile, dob });
    if (user) {
      const token = jwt.sign({ id: user._id, role: "student" }, SECRET_KEY, { expiresIn: "7d" });
      return res.json({
        message: "Login successful",
        role: "student",
        user,
        token
      });
    }

    // Try Teacher
    user = await Teacher.findOne({ mobile, dob });
    if (user) {
      const token = jwt.sign({ id: user._id, role: "teacher" }, SECRET_KEY, { expiresIn: "7d" });
      return res.json({
        message: "Login successful",
        role: "teacher",
        user,
        token
      });
    }

    return res.status(404).json({ message: "Invalid mobile or DOB" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
