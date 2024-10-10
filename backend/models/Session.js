const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  sessionName: {
    type: String,
    required: true,
  },
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
  },
  startDateTime: {
    type: String,
    required: true,
  },
  endDateTime: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
});

module.exports = mongoose.model("Session", sessionSchema);
