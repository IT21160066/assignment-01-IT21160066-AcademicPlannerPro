const Faculty = require("../models/Faculty");
const Course = require("../models/Course");

// @desc Get all faculties
// @route GET /faculty
// @access Private

const getAllFaculties = async (req, res) => {
  try {
    const faculties = await Faculty.find().lean();
    if (!faculties?.length)
      return res.status(400).json({ message: "No faculties found" });

    res.json(faculties);
  } catch (error) {
    console.error("Error fetching faculties:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc Create new faculty
// @route POST /faculty
// @access Private

const createNewFaculty = async (req, res) => {
  try {
    const { facultyName, facultyCode } = req.body;

    // confirm data
    if (!facultyName || !facultyCode)
      return res.status(400).json({ message: "All fields are required" });

    // check for duplicates
    const duplicate = await Faculty.findOne({ facultyName }).lean().exec();
    if (duplicate)
      return res.status(409).json({ message: "Duplicate Faculty name" });

    // create and store new faculty
    const faculty = await Faculty.create({ facultyName, facultyCode });
    if (faculty)
      res.status(201).json({ message: `New Faculty ${facultyName} created` });
    else res.status(400).json({ message: "Invalid Faculty data recived" });
  } catch (error) {
    console.error("Error creating faculty:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc Update a faculty
// @route PATCH /faculty
// @access Private

const updateFaculty = async (req, res) => {
  try {
    const { id, facultyName, facultyCode } = req.body;

    // Confirm data
    if (!id || !facultyName || !facultyCode)
      return res.status(400).json({ message: "All fileds are required" });

    const faculty = await Faculty.findById(id).exec();
    if (!faculty) return res.status(400).json({ message: "Faculty not found" });

    // Check for duplicates
    const duplicate = await Faculty.findOne({ facultyName }).lean().exec();

    // Allow updates to the original faculty
    if (duplicate && duplicate?._id.toString() !== id)
      return res.status(409).json({ message: "Duplicate Faculty name" });

    faculty.facultyName = facultyName;
    faculty.facultyCode = facultyCode;

    const updatedFaculty = await faculty.save();
    res.json({ message: `${updatedFaculty.facultyName} updated` });
  } catch (error) {
    console.error("Error updating faculty:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc Delete a faculty
// @route DELETE /faculty
// @access Private

const deletefaculty = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) return res.status(400).json({ message: "Faculty ID required" });

    const faculty = await Faculty.findById(id).exec();
    if (!faculty) return res.status(400).json({ message: "Faculty not found" });

    const facultyWithCourses = await Course.find({ faculty: id }).exec();
    if (facultyWithCourses) {
      return res
        .status(400)
        .json({ message: "Cannot delete. Courses exist with this Faculty." });
    }

    const facultyName = faculty.facultyName;
    await faculty.deleteOne();

    const reply = `Faculty ${facultyName} with ${id} deleted`;
    res.json(reply);
  } catch (error) {
    console.error("Error deleting faculty:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllFaculties,
  createNewFaculty,
  updateFaculty,
  deletefaculty,
};
