const Enrollment = require("../models/Enrollment");

//Enable students to enroll in courses
const enrollStudents = async (req, res) => {
  try {
    const { studentID, student, course } = req.body;

    if (!studentID || !student || !course)
      return res.status(400).json({ message: "All fields are required" });

    const existingEnrollment = await Enrollment.findOne({
      studentID: studentID,
      student: student,
      course: course,
    });

    if (existingEnrollment) {
      return res
        .status(400)
        .json({ message: "User is already enrolled in this course" });
    }

    const newEnrollment = new Enrollment({
      studentID: studentID,
      student: student,
      course: course,
      status: "Enrolled",
    });

    await newEnrollment.save();
    return res.status(200).json({ message: "Student enrolled successfully" });
  } catch (error) {
    console.error("Error enrolling student:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find().lean();
    if (!enrollments?.length)
      return res.status(400).json({ message: "No enrollments found" });

    res.json(enrollments);
  } catch (error) {
    console.error("Error fetching enrollments:", +error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateEnrollments = async (req, res) => {
  try {
    const { id, studentID, student, course, status } = req.body;

    if (
      !id ||
      !studentID ||
      !student ||
      !course ||
      (status !== "Enrolled" && status !== "Dropped")
    )
      return res.status(400).json({ message: "All fields are required" });

    const enroll = await Enrollment.findById(id).exec();
    if (!enroll)
      return res.status(400).json({ message: "Enrollment not found" });

    const duplicate = await Enrollment.findOne({ studentID, course })
      .lean()
      .exec();

    if (duplicate && duplicate?._id.toString() !== id)
      return res.status(409).json({ message: "Duplicate Enrollment" });

    enroll.studentID = studentID;
    enroll.student = student;
    enroll.course = course;
    enroll.status = status;

    const updatedEnrollment = await enroll.save();
    res.json({
      message: `Enrollment updated with student ID ${updatedEnrollment.student}`,
    });
  } catch (error) {
    console.error("Error fetching enrollments:", +error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteEnrollments = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ message: "Ebrollment ID required" });

    // Confirm exists to delete
    const enroll = await Enrollment.findById(id).exec();
    if (!enroll)
      return res.status(404).json({ message: "Enrollment not found" });

    await enroll.deleteOne();
    const reply = `Enrollment with ${id} deleted`;
    res.json(reply);
  } catch (error) {
    console.error("Error deleteing Enrollment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  enrollStudents,
  getAllEnrollments,
  updateEnrollments,
  deleteEnrollments,
};
