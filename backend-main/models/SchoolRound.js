const mongoose = require("mongoose");

const roundStatusSchema = new mongoose.Schema({
  postingOpen: { type: Boolean, default: false },
  votingOpen: { type: Boolean, default: false },
});

const schoolRoundSchema = new mongoose.Schema({
  school: { type: String, required: true, unique: true },
  round1: { type: roundStatusSchema, default: () => ({}) },
  round2: { type: roundStatusSchema, default: () => ({}) },
  finale: { type: roundStatusSchema, default: () => ({}) },
});

module.exports = mongoose.model("SchoolRound", schoolRoundSchema);
