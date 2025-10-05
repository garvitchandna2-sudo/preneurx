const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  round: {
    type: Number,
    default: 1, // Default round is 1
  },
  voteCount: {
    type: Number,
    default: 0,
  },
  superVoteCount: {
    type: Number,
    default: 0,
  },
  r1fp: {
    type: Number,
    default: 0,
  },
r2fp: {
    type: Number,
    default: 0,
  },
r3fp: {
    type: Number,
    default: 0,
  }
});

module.exports = mongoose.model("Post", postSchema);
