// models/VoteRecord.js
const mongoose = require("mongoose");

const voteRecordSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  round: {
    type: Number,
    required: true,
  },
  votePostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    default: null,
  },
  superVotePostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    default: null,
  },
});

voteRecordSchema.index({ studentId: 1, round: 1 }, { unique: true }); // One record per round per student

module.exports = mongoose.model("VoteRecord", voteRecordSchema);
