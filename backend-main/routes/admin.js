const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { authMiddleware, adminOnly } = require("../middleware/auth");

const router = express.Router();

// POST /api/admin/register-user
router.post("/register-user", authMiddleware, adminOnly, async (req, res) => {
const { name, contactNumber, password, role, school, class: studentClass, section } = req.body;


  if (!["student", "teacher"].includes(role)) {
    return res.status(400).json({ message: "Only student or teacher can be registered" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(req.body);

   const newUser = new User({
  name,
  contactNumber,
  password: hashedPassword,
  role,
  class: role === "student" ? studentClass : undefined,
  section: role === "student" ? section : undefined,
  school
});


    await newUser.save();

    res.status(201).json({ message: "User registered successfully", userId: newUser._id });
    console.log(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
