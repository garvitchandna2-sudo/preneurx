const express = require("express");
const router = express.Router();
const SchoolRound = require("../models/SchoolRound");

// Add new school
router.post("/add", async (req, res) => {
  const { school } = req.body;
  try {
    const exists = await SchoolRound.findOne({ school });
    if (exists) return res.status(400).json({ message: "School already exists" });

    const newSchool = new SchoolRound({ school });
    await newSchool.save();
    res.status(201).json(newSchool);
  } catch (err) {
    console.error("Error adding school:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all schools + their round status
router.get("/all", async (req, res) => {
  try {
    const schools = await SchoolRound.find();
    res.json(schools);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update status of a specific round for a school
router.put("/update", async (req, res) => {
  const { school, round, postingOpen, votingOpen } = req.body;

  if (!school || !round) {
    return res.status(400).json({ message: "School and round are required" });
  }

  try {
    const updateFields = {};
    if (postingOpen !== undefined) updateFields[`$set`] = { [`${round}.postingOpen`]: postingOpen };
    if (votingOpen !== undefined) {
      if (!updateFields["$set"]) updateFields["$set"] = {};
      updateFields["$set"][`${round}.votingOpen`] = votingOpen;
    }

    const updated = await SchoolRound.findOneAndUpdate(
      { school },
      updateFields,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "School not found" });

    res.json({ message: "Round updated", data: updated });
  } catch (err) {
    console.error("Error updating round:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get status for a specific school
router.get("/school/:schoolName", async (req, res) => {
  const { schoolName } = req.params;
  try {
    const school = await SchoolRound.findOne({ school: schoolName });
    if (!school) return res.status(404).json({ message: "Not found" });
    res.json(school);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;