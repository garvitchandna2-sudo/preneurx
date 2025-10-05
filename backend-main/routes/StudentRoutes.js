const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Post = require("../models/Post");
const { upload } = require("../middleware/cloudinary");
const VoteRecord = require("../models/VoteRecord");


// GET /api/student/me/:id
router.get("/me/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).select("-password");
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    console.error("Error fetching student:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get post by student
router.get("/post/:id", async (req, res) => {
  const post = await Post.findOne({ studentId: req.params.id });
  if (!post) return res.json({});
  res.json(post);
});

// Create or update post
router.post("/post", async (req, res) => {
  const { studentId, content } = req.body;

  let post = await Post.findOne({ studentId });
  if (post) {
    post.content = content;
    await post.save();
  } else {
    post = new Post({ studentId, content });
    await post.save();
  }

  res.json(post);
});

router.post("/upload-profile/:id", upload.single("profilePic"), async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    student.profilePic = req.file.path;
    await student.save();

    res.json({ message: "Profile picture updated", url: req.file.path });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed backend" });
  }
});

// Get all posts for Class Clash (Round 1) by class level
router.get("/class-clash/:school/:classLevel", async (req, res) => {
  const { school, classLevel } = req.params;
  try {
    const students = await Student.find({ school, classLevel }).select("_id name profilePic");
    const studentIds = students.map(s => s._id);

    const posts = await Post.find({ studentId: { $in: studentIds }, round: 1 })
      .populate("studentId", "name profilePic school");

    res.json(posts);
  } catch (err) {
    console.error("Class Clash fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/round2-posts/:school/:category", async (req, res) => {
  const { school, category } = req.params;

  try {
    // Map categories to classLevels
    let eligibleClasses = [];
    if (category === "junior") {
      eligibleClasses = ["seventh", "eighth"];
    } else if (category === "senior") {
      eligibleClasses = ["ninth", "tenth"];
    } else {
      return res.status(400).json({ message: "Invalid category" });
    }

    console.log("Filtering for school:", school, "Classes:", eligibleClasses);

    const students = await Student.find({
      school, // plain string match
      classLevel: { $in: eligibleClasses },
    }).select("_id name profilePic");

    console.log("Students found:", students.length);

    const studentIds = students.map(s => s._id);

    const posts = await Post.find({
      studentId: { $in: studentIds },
      round: 2,
    }).populate("studentId", "name profilePic school");

    res.json(posts);
  } catch (err) {
    console.error("Round 2 fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// Get all finale posts across all schools (round: 3)
router.get("/finale-posts/:category", async (req, res) => {
  const { category } = req.params;

  try {
    // Validate and map category to actual classLevel strings
    let eligibleClasses = [];
    if (category === "junior") {
      eligibleClasses = ["seventh", "eighth"];
    } else if (category === "senior") {
      eligibleClasses = ["ninth", "tenth"];
    } else {
      return res.status(400).json({ message: "Invalid category" });
    }

    console.log("Fetching finale posts for category:", category, "Classes:", eligibleClasses);

    const students = await Student.find({
      classLevel: { $in: eligibleClasses }
    }).select("_id name profilePic school");

    const studentIds = students.map(s => s._id);

    const posts = await Post.find({
      studentId: { $in: studentIds },
      round: 3,
    }).populate("studentId", "name profilePic school");

    res.json(posts);
  } catch (err) {
    console.error("Finale fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});




// Vote
// POST /api/student/vote
router.post("/vote", async (req, res) => {
  const { studentId, postId, round } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    let record = await VoteRecord.findOne({ studentId, round });

    // If already voted
    if (record?.votePostId) {
      return res.status(400).json({ message: "You already cast your vote for this round" });
    }

    // If voted same post as super vote
    if (record?.superVotePostId?.toString() === postId) {
      return res.status(400).json({ message: "Cannot vote and super vote on the same post" });
    }

    // Create or update vote record
    if (record) {
      record.votePostId = postId;
      await record.save();
    } else {
      await VoteRecord.create({ studentId, round, votePostId: postId });
    }

    post.voteCount += 1;
    await post.save();

    res.json({ message: "Vote recorded" });

  } catch (err) {
    console.error("Vote error:", err);
    res.status(500).json({ message: "Error voting" });
  }
});


// Super Vote
// POST /api/student/super-vote
router.post("/super-vote", async (req, res) => {
  const { studentId, postId, round } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    let record = await VoteRecord.findOne({ studentId, round });

    if (record?.superVotePostId) {
      return res.status(400).json({ message: "You already cast your super vote for this round" });
    }

    if (record?.votePostId?.toString() === postId) {
      return res.status(400).json({ message: "Cannot vote and super vote on the same post" });
    }

    if (record) {
      record.superVotePostId = postId;
      await record.save();
    } else {
      await VoteRecord.create({ studentId, round, superVotePostId: postId });
    }

    post.superVoteCount += 1;
    await post.save();

    res.json({ message: "Super vote recorded" });

  } catch (err) {
    console.error("Super Vote error:", err);
    res.status(500).json({ message: "Error super voting" });
  }
});

// Get vote status
// GET /api/student/vote-status/:studentId/:round
router.get("/vote-status/:studentId/:round", async (req, res) => {
  const { studentId, round } = req.params;

  try {
    const record = await VoteRecord.findOne({ studentId, round });
    if (!record) return res.json({ votePostId: null, superVotePostId: null });

    res.json({
      votePostId: record.votePostId,
      superVotePostId: record.superVotePostId
    });
  } catch (err) {
    console.error("Vote status error:", err);
    res.status(500).json({ message: "Failed to fetch vote status" });
  }
});


module.exports = router;
