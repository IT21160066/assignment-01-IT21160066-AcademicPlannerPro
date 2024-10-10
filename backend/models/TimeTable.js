const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema({
  faculty: {
    type: mongoose.Schema.ObjectId,
    ref: "Faculty",
  },
  sessions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
    },
  ],
});

module.exports = mongoose.model("TimeTable", timetableSchema);
