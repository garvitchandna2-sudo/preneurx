const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { contactNumber, password, role } = req.body;

  try {
    // Match by contactNumber & role
    const users = await User.find({ contactNumber, role });

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the one with matching password
    let matchedUser = null;

    for (const user of users) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        matchedUser = user;
        break;
      }
    }

    if (!matchedUser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { id: matchedUser._id, role: matchedUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: matchedUser._id,
        name: matchedUser.name,
        contactNumber: matchedUser.contactNumber,
        role: matchedUser.role,
        class: matchedUser.class || null,
        school: matchedUser.school || null,
        profilePic: matchedUser.profilePic
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
