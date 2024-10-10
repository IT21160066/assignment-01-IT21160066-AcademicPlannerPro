const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  // email: {
  //   type: String,
  //   required: true,
  //   unique: true
  // },
  password: {
    type: String,
    required: true,
  },
  roles: [
    {
      type: String,
      enum: ["Admin", "FacultyAdmin", "Student"],
      required: true,
      default: "Student",
    },
  ],
  activeStatus: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("User", userSchema);
