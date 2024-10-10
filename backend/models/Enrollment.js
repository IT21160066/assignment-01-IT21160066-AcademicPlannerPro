const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  studentID: {
    type: String,
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  status: { type: String, enum: ["Enrolled", "Dropped"], default: "Dropped" },
});

module.exports = mongoose.model("Enrollment", enrollmentSchema);
