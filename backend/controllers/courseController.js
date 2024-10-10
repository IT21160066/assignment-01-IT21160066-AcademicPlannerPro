const Course = require("../models/Course");
const Faculty = require("../models/Faculty");
const User = require("../models/User");

// @desc Get all courses
// @route GET /courses
// @access Private

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().lean();
    if (!courses?.length)
      return res.status(400).json({ message: "No Courses found" });

    const courseWithFaculty = await Promise.all(
      courses.map(async (course) => {
        try {
          const faculty = await Faculty.findById(course.faculty).lean().exec();
          return { ...course, faculty: faculty.facultyName };
        } catch (error) {
          console.error("Error fetching faculty:", error);
          return { ...course, faculty: "Unknown Faculty" };
        }
      })
    );
    res.json(courseWithFaculty);
  } catch (error) {
    console.log("Error fetching Courses", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

// @desc Create new course
// @route POST /courses
// @access Private

const createNewCourse = async (req, res) => {
  const { courseCode, courseName, description, credits, faculty } = req.body;

  // Confirm data
  if (
    !courseCode ||
    !courseName ||
    !description ||
    !credits ||
    !Array.isArray(faculty) ||
    !faculty.length
  )
    return res.status(400).json({ message: "All fileds are required" });

  // Check for duplicates
  const duplicate = await Course.findOne({ courseName }).lean().exec();
  if (duplicate)
    return res.status(409).json({ message: "Duplicate Course name" });

  // Create and store new course
  const course = await Course.create({
    courseCode,
    courseName,
    description,
    credits,
    faculty,
  });

  if (course)
    res.status(201).json({ message: `New Course ${courseName} created` });
  else res.status(400).josn({ message: "Invalid course data recived" });
};

// @desc Update a course
// @route PATCH /courses
// @access Private

const updateCourse = async (req, res) => {
  try {
    const { id, courseCode, courseName, description, credits, faculty } =
      req.body;

    if (
      !id ||
      !courseCode ||
      !courseName ||
      !description ||
      !credits ||
      !Array.isArray(faculty) ||
      !faculty.length
    )
      return res.status(400).json({ message: "All fields are required" });

    const course = await Course.findById(id).exec();
    if (!course) return res.status(400).json({ message: "Course not found" });

    // Check for duplicates
    const duplicate = await Course.findOne({ courseName }).lean().exec();
    if (duplicate && duplicate?._id.toString() !== id)
      return res.status(409).json({ message: "Duplicate Course name" });

    course.courseName = courseName;
    course.courseCode = courseCode;
    course.description = description;
    course.credits = credits;
    course.faculty = faculty;

    const updatedCourse = await course.save();
    res.json({ message: `${updatedCourse.courseName} is updated` });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc Delete a course
// @route DELETE /courses
// @access Private

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ message: "Course ID required" });

    // Confirm course exists to delete
    const course = await Course.findById(id).exec();
    if (!course) return res.status(404).json({ message: "Course not found" });

    const courseName = course.courseName;
    await course.deleteOne();

    const reply = `Course ${courseName} with ${id} deleted`;
    res.json(reply);
  } catch (error) {
    console.error("Error deleteing course:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllCourses,
  createNewCourse,
  updateCourse,
  deleteCourse,
};
