const express = require("express");
const router = express.Router();
const Teacher = require("../models/Teacher");
const Post = require("../models/Post");
const Student = require("../models/Student");
const TeacherVoteRecord = require("../models/TeacherVoteRecord");




// GET /api/teacher/vote-status/:teacherId
router.get("/vote-status/:teacherId", async (req, res) => {
  try {
    const record = await TeacherVoteRecord.findOne({ teacherId: req.params.teacherId, round: 1 });
    if (!record) return res.json({ votedPostIds: [] });

    res.json({ votedPostIds: record.votedPostIds });
  } catch (err) {
    console.error("Vote status fetch error:", err);
    res.status(500).json({ message: "Failed to fetch vote status" });
  }
});




// POST /api/teacher/vote
router.post("/vote", async (req, res) => {
  const { teacherId, postId } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post || post.round !== 1) {
      return res.status(400).json({ message: "Invalid post or not in round 1" });
    }

    let record = await TeacherVoteRecord.findOne({ teacherId, round: 1 });

    if (record && record.votedPostIds.includes(postId)) {
      return res.status(400).json({ message: "Already voted on this post" });
    }

    if (record) {
      if (record.votedPostIds.length >= 5) {
        return res.status(400).json({ message: "Maximum 5 votes allowed" });
      }
      record.votedPostIds.push(postId);
      await record.save();
    } else {
      await TeacherVoteRecord.create({
        teacherId,
        round: 1,
        votedPostIds: [postId],
      });
    }

    post.voteCount += 1;
    await post.save();

    res.json({ message: "Vote recorded successfully" });
  } catch (err) {
    console.error("Vote error:", err);
    res.status(500).json({ message: "Vote failed" });
  }
});




// GET /api/teacher/eligible-posts/:teacherId
router.get("/eligible-posts/:teacherId", async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.teacherId);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    // Find students in same school and class
    const students = await Student.find({
      school: teacher.school,
      classLevel: teacher.classLevel,
    }).select("_id");

    const studentIds = students.map((s) => s._id);

    const posts = await Post.find({
      studentId: { $in: studentIds },
      round: 1,
    }).populate("studentId", "name profilePic");

    res.json(posts);
  } catch (err) {
    console.error("Eligible posts fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;