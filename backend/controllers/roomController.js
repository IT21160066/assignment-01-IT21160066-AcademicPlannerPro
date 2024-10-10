const Room = require("../models/Room");
const Booking = require("../models/Booking");

// @desc Get all rooms
// @route GET /rooms
// @access Private

const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().lean();
    if (!rooms?.length)
      return res.status(400).json({ message: "No rooms found" });

    res.json(rooms);
  } catch (error) {
    console.log("Error fetching Rooms" + error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

// @desc Create new room
// @route POST /rooms
// @access Private

const createNewRoom = async (req, res) => {
  try {
    const { roomCode, roomName, capacity, resources } = req.body;

    // Confirm data
    if (
      !roomCode ||
      !roomName ||
      !capacity ||
      !Array.isArray(resources) ||
      !resources.length
    )
      return res.status(400).json({ message: "All fields are required" });

    // Check for diplicates
    const duplicate = await Room.findOne({ roomName }).lean().exec();
    if (duplicate)
      return res.status(409).json({ message: "Duplicate Room name" });

    // Create and store new Room
    const room = await Room.create({ roomCode, roomName, capacity, resources });
    if (room) res.status(201).json({ message: `New Room ${roomName} created` });
    else res.status(400).json({ message: "Invalid Room data recived" });
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc Update a room
// @route PATCH /rooms
// @access Private

const updateRoom = async (req, res) => {
  try {
    const { id, roomCode, roomName, capacity, resources, roomAvailabilty } =
      req.body;

    if (
      !id ||
      !roomCode ||
      !roomName ||
      !capacity ||
      !Array.isArray(resources) ||
      !resources.length ||
      typeof roomAvailabilty !== "boolean"
    )
      return res.status(400).json({ message: "All fileds are required" });

    const room = await Room.findById(id).exec();
    if (!room) return res.status(400).json({ message: "Room not found" });

    // Check for duplicates
    const duplicate = await Room.findOne({ roomName }).lean().exec();

    // Allow updates to the original room
    if (duplicate && duplicate?._id.toString() !== id)
      return res.status(409).json({ message: "Duplicate Room name" });

    room.roomCode = roomCode;
    room.roomName = roomName;
    room.capacity = capacity;
    room.resources = resources;
    room.roomAvailabilty = roomAvailabilty;
    // room.bookings = bookings;

    const updatedRoom = await room.save();

    res.json({ message: `${updatedRoom.roomName} is updated` });
  } catch (error) {
    console.error("Error updating room:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc Delete a room
// @route DELETE /rooms
// @access Private

const deleteRoom = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ message: "Room ID required" });

    const room = await Room.findById(id).exec();

    if (!room) return res.status(400).json({ message: "Room not found" });

    const deletedRoom = room.roomName;
    await room.deleteOne();

    const reply = `${deletedRoom} Room deleted`;
    res.json(reply);
  } catch (error) {
    console.error("Error deleteing course:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllRooms,
  createNewRoom,
  updateRoom,
  deleteRoom,
};
