const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomCode: {
    type: String,
    required: true,
    unique: true,
  },
  roomName: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  resources: [
    {
      type: String,
      required: true,
    },
  ],
  roomAvailabilty: {
    type: Boolean,
    default: false,
  },
  // bookings: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     required: true,
  //     ref: "Booking",
  //   },
  // ],
});

module.exports = mongoose.model("Room", roomSchema);
