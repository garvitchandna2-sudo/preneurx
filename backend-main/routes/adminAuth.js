const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

// Admin Register
router.post("/register", async (req, res) => {
  try {
    const { name, mobile, password } = req.body;

    if (!name || !mobile || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existing = await Admin.findOne({ mobile });
    if (existing) {
      return res.status(400).json({ message: "Admin already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ name, mobile, password: hashedPassword });
    await newAdmin.save();

    const token = jwt.sign({ id: newAdmin._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      token,
      admin: { id: newAdmin._id, name: newAdmin.name, mobile: newAdmin.mobile },
    });
  } catch (err) {
    console.error("Admin signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Admin Login
router.post("/login", async (req, res) => {
  try {
    const { mobile, password } = req.body;

    const admin = await Admin.findOne({ mobile });
    if (!admin) return res.status(400).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({
      token,
      admin: { id: admin._id, name: admin.name, mobile: admin.mobile, role:'admin' },
    });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});



router.post("/register-user", async (req, res) => {
  try {
    const { role, name, mobile, dob, school, classLevel,section } = req.body;

    if (!["student", "teacher"].includes(role)) {
      return res.status(400).json({ message: "Invalid role." });
    }

    if (!name || !mobile || !dob || !school || (role === "student" && !classLevel)) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const Model = role === "student" ? Student : Teacher;

    const existing = await Model.findOne({ mobile, dob });
    if (existing) {
      return res.status(400).json({ message: `${role} already exists.` });
    }

    const newUser = new Model({ name, mobile, dob, school, classLevel,section });
    await newUser.save();

    res.status(201).json({ message: `${role} registered successfully.` });
  } catch (err) {
    console.error("User registration error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
