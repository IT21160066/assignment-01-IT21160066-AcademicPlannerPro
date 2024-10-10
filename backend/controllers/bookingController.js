const Booking = require("../models/Booking");
const Session = require("../models/Session");

// @desc Get all bookings
// @route GET /bookings
// @access Private

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().lean();
    if (!bookings?.length)
      return res.status(400).json({ message: "No Bookings found" });
    res.json(bookings);
  } catch (error) {
    console.log("Error fetching Bookings", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

// @desc Create new booking
// @route POST /bookings
// @access Private

const createNewBooking = async (req, res) => {
  try {
    const { createdAdmin, room, course, startDateTime, endDateTime } = req.body;

    // Check for overlapping bookings for the requested room
    const overlappingBookings = await Booking.find({
      room: room,
      $or: [
        {
          startDateTime: { $lte: endDateTime },
          endDateTime: { $gt: startDateTime },
        },
        {
          startDateTime: { $gte: startDateTime, $lt: endDateTime },
        },
      ],
    });

    if (overlappingBookings.length > 0) {
      return res
        .status(400)
        .json({ message: "Room already booked during this time" });
    }

    const newBooking = new Booking({
      createdAdmin: createdAdmin,
      course: course,
      room: room,
      startDateTime,
      endDateTime,
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc Update a booking
// @route PATCH /bookings
// @access Private

const updateBooking = async (req, res) => {
  try {
    const { id, createdAdmin, room, course, startDateTime, endDateTime } =
      req.body;

    // Checkif booking exsits
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Check for overlapping bookings
    const overlappingBookings = await Booking.find({
      _id: { $ne: id }, // Exclude the current booking
      room: room,
      $or: [
        {
          startDateTime: { $lte: endDateTime },
          endDateTime: { $gt: startDateTime },
        },
        {
          startDateTime: { $gte: startDateTime, $lt: endDateTime },
        },
      ],
    });

    if (overlappingBookings.length > 0) {
      return res
        .status(400)
        .json({ message: "Room already booked during this time" });
    }

    booking.createdAdmin = createdAdmin;
    booking.room = room;
    booking.course = course;
    booking.startDateTime = startDateTime;
    booking.endDateTime = endDateTime;

    const updateBooking = await booking.save();

    // if (!updateBooking)
    //   return res.status(404).json({ message: "Booking not found" });

    res.json(updateBooking);
  } catch (error) {
    console.error("Error updating Booking data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc Delete a booking
// @route DELETE /bookings
// @access Private

const deleteBooking = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ message: "Booking ID required" });

    // Check if any sessions exist with this booking
    const sessionWithBooking = await Session.findOne({ booking: id }).exec();
    if (sessionWithBooking) {
      return res
        .status(400)
        .json({ message: "Cannot delete. Sessions exist with this booking." });
    }

    // Confirm exists to delete
    const booking = await Booking.findById(id).exec();
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    await booking.deleteOne();
    const reply = `Booking with ${id} deleted`;
    res.json(reply);
  } catch (error) {
    console.error("Error deleteing Booking:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllBookings,
  createNewBooking,
  updateBooking,
  deleteBooking,
};
