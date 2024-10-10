const User = require("../models/User");
const Notification = require("../models/Notification");
const TimeTable = require("../models/TimeTable");
const Session = require("../models/Session");
const DAYS = require("../constant/constants");
const getDayOfWeek = require("../utils/utilFunctions");

// @desc Get all sessins
// @route GET /sessions
// @access Private

const getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find().lean();
    if (!sessions?.length)
      return res.status(400).json({ message: "No sessions found" });
    res.json(sessions);
  } catch (error) {
    console.log("Error fetching Sessions" + error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

// @desc Create new timeTableUsingSessions
// @route POST /sessions
// @access Private

const createSessionForTimeTable = async (req, res) => {
  try {
    const {
      sessionName,
      booking,
      faculty,
      startDateTime,
      endDateTime,
      course,
    } = req.body;
    if (
      (!sessionName,
      !booking || !faculty || !startDateTime || !endDateTime || !course)
    )
      return res.status(400).json({ message: "All fields are required" });

    // Check if there's already a session associated with the booking ID
    const existingSession = await Session.findOne({ booking });

    if (existingSession) {
      return res
        .status(400)
        .json({ message: "Session already exists for this booking" });
    }

    // Check for existing time table
    const existingTimeTbale = await TimeTable.findOne({
      faculty: faculty,
    }).populate({ path: "sessions" });

    // Check for if there are any sessions at given time
    if (existingTimeTbale) {
      const sessionInDay = existingTimeTbale.sessions.filter((session) => {
        return (
          getDayOfWeek(session.startDateTime) === getDayOfWeek(startDateTime)
        );
      });

      for (const session of sessionInDay) {
        const existingStartDateTime = new Date(session.startDateTime).getTime();
        const existingEndtDateTime = new Date(session.endDateTime).getTime();
        const userEnteredStartDateTime = new Date(startDateTime).getTime();
        const userEnteredEndDateTime = new Date(endDateTime).getTime();

        // Check overlapping sessions
        const overlappingSession =
          (existingStartDateTime <= userEnteredStartDateTime &&
            existingEndtDateTime > userEnteredStartDateTime) ||
          (existingStartDateTime < userEnteredEndDateTime &&
            existingEndtDateTime >= userEnteredEndDateTime);

        if (overlappingSession)
          return res.status(400).json({ message: "Session is overlapping" });
      }
    }

    let timeTable = null;

    if (!existingTimeTbale) {
      timeTable = await TimeTable.create({
        faculty: faculty,
      });
    } else {
      timeTable = existingTimeTbale;
    }

    if (!timeTable) {
      return res
        .status(500)
        .json({ message: "No Timetable present to add sessions" });
    }

    // Create session only if there is no overlapping session
    const session = await Session.create({
      sessionName,
      booking: booking,
      startDateTime,
      endDateTime,
      course: course,
      faculty: faculty,
      day: getDayOfWeek(startDateTime),
    });

    timeTable.sessions.push(session._id);
    await timeTable.save();

    const users = await User.find({});

    const notifications = users.map((user) => {
      return new Notification({
        userID: user._id,
        message: `New Session added to the Timetable check this out!`,
      });
    });

    await Notification.insertMany(notifications);

    res.json({ message: "Session added to timetable successfully" });
  } catch (error) {
    console.error("Error creating Time table:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateSession = async (req, res) => {
  try {
    const {
      id,
      sessionName,
      booking,
      faculty,
      startDateTime,
      endDateTime,
      course,
    } = req.body;
    if (
      !id ||
      !sessionName ||
      !booking ||
      !course ||
      !faculty ||
      !startDateTime ||
      !endDateTime
    )
      return res.status(400).json({ message: "All fields are required" });

    // Checkif booking exsits
    const existingSession = await Session.findById(id);
    if (!existingSession)
      return res.status(404).json({ message: "Session not found" });

    // Check for time conflicts with other sessions in the time table
    const timeTable = await TimeTable.findOne({ faculty }).populate({
      path: "sessions",
      match: { _id: { $ne: existingSession._id } }, // Exclude the existing session
    });

    if (timeTable) {
      const sessionInDay = timeTable.sessions.filter((session) => {
        return (
          getDayOfWeek(session.startDateTime) === getDayOfWeek(startDateTime)
        );
      });

      for (const session of sessionInDay) {
        const existingStartDateTime = new Date(session.startDateTime).getTime();
        const existingEndtDateTime = new Date(session.endDateTime).getTime();
        const userEnteredStartDateTime = new Date(startDateTime).getTime();
        const userEnteredEndDateTime = new Date(endDateTime).getTime();

        // Check overlapping sessions
        const overlappingSession =
          (existingStartDateTime <= userEnteredStartDateTime &&
            existingEndtDateTime > userEnteredStartDateTime) ||
          (existingStartDateTime < userEnteredEndDateTime &&
            existingEndtDateTime >= userEnteredEndDateTime);

        if (overlappingSession)
          return res.status(400).json({ message: "Session is overlapping" });
      }

      const updatedSession = await Session.findByIdAndUpdate(
        id,
        {
          sessionName,
          booking,
          faculty,
          startDateTime,
          endDateTime,
          course,
        },
        { new: true }
      );

      if (!updatedSession)
        return res.status(404).json({ message: "Session not found" });

      return res.json({
        message: "Session updated successfully",
        session: updatedSession,
      });
    }
  } catch (error) {
    console.error("Error udating Session:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc Delete a session
// @route DELETE /sessions
// @access Private

const deleteSession = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ message: "Session ID required" });

    const session = await Session.findById(id).exec();
    if (!session) return res.status(400).json({ message: "Session not found" });

    // Remove session from timetable if it exists
    const timetable = await TimeTable.findOne({ session: id }).exec();
    if (timetable) {
      timetable.sessions = timetable.sessions.filter(
        (sessionId) => sessionId.toString() !== id
      );
      await timetable.save();
    }

    await session.deleteOne();

    const reply = `Session deleted successfully`;
    res.json(reply);
  } catch (error) {
    console.error("Error deleteing Session:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllSessions,
  createSessionForTimeTable,
  updateSession,
  deleteSession,
};
