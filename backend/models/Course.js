const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: true,
    unique: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  credits: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => value > 0,
      message: "Credits must be a positive number.",
    },
  },
  faculty: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Faculty",
    },
  ],
});

// Pre-save hook to handle validation errors
courseSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("Course code must be unique."));
  } else {
    next(error);
  }
});

module.exports = mongoose.model("Course", courseSchema);
