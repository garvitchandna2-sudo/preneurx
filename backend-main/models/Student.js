const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  dob: Date,
  school: String,
  classLevel: String,
  section:String,
  profilePic: {
    type: String,
    default: "https://img.freepik.com/premium-vector/profile-picture-placeholder-avatar-silhouette-gray-tones-icon-colored-shapes-gradient_1076610-40164.jpg?semt=ais_hybrid&w=740" // or your default image URL
  }
});


module.exports = mongoose.model("Student", studentSchema);
