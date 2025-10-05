const mongoose = require("mongoose");

const teacherVoteSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  votedPostIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  }],
  round: {
    type: Number,
    default: 1
  }
});

module.exports = mongoose.model("TeacherVoteRecord", teacherVoteSchema);
