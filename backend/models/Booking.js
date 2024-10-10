const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  createdAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  startDateTime: {
    type: String,
    required: true,
  },
  endDateTime: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
