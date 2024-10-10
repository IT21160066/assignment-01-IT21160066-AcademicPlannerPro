const User = require("../models/User");
const TimeTable = require("../models/TimeTable");
const Session = require("../models/Session");
const DAYS = require("../constant/constants");
const getDayOfWeek = require("../utils/utilFunctions");
const mongoose = require("mongoose");

// @desc Get all timeTables
// @route GET /timeTable
// @access Private

const getAllTimeTables = async (req, res) => {
  try {
    const timetables = await TimeTable.find().populate("sessions");
    if (!timetables?.length)
      return res.status(400).json({ message: "No timetables found" });
    res.json(timetables);
  } catch (error) {
    console.log("Error fetching Time tables" + error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

// @desc Update a timeTable
// @route PATCH /timeTable
// @access Private

const updateTimeTable = async (req, res) => {
  try {
  } catch (error) {
    console.error("Error updating Time table:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc Delete a timeTable
// @route DELETE /timeTable
// @access Private

const deleteTimeTable = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ message: "TimeTable ID required" });

    const timeTable = await TimeTable.findById(id).exec();
    if (!timeTable)
      return res.status(400).json({ message: "TimeTable not found" });

    if (
      Array.isArray(timeTable.sessions) &&
      timeTable.sessions.isMongooseDocumentArray
    ) {
      return res
        .status(400)
        .json({ message: "Cannot delete: Timetable has associated sessions" });
    }
    await timeTable.deleteOne();

    const reply = `TimeTable deleted successfully`;
    res.json(reply);
  } catch (error) {
    console.error("Error deleteing Time table:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllTimeTables,
  updateTimeTable,
  deleteTimeTable,
};
