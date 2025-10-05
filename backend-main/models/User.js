const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactNumber: { type: String, required: true },
  password: { type: String, required: true }, // hashed
  role: { type: String, enum: ["student", "teacher", "admin"], required: true },
  profilePic: { type: String, default: "" },

  // Optional:
  class: { type: String }, // only for students
  school: {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School" },
    name: { type: String },
  },

  registeredAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model("User", userSchema);
