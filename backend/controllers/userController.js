const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

/**
 * If any error happen inside functions then asyncHandler
 * will kick that out those errors into error handling middleware.
 */

// @desc Get all users
// @route GET /users
// @access Private

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();
  if (!users?.length)
    return res.status(400).json({ message: "No users found" });

  res.json(users);
});

// @desc Create new user
// @route POST /users
// @access Private

const createNewUser = asyncHandler(async (req, res) => {
  const { userName, password, roles } = req.body;

  // Confirming data
  if (!userName || !password || !Array.isArray(roles) || !roles.length)
    return res.status(400).json({ message: "All field are required" });

  // Check for duplicates
  const duplicate = await User.findOne({ userName }).lean().exec();

  if (duplicate) return res.status(409).json({ message: "Duplicate username" });

  // Hash password
  const hashPwd = await bcrypt.hash(password, 10); // Salt rounds

  const userObject = { userName, password: hashPwd, roles };

  // Create & store new user
  const user = await User.create(userObject);

  if (user) res.status(201).json({ message: `New user ${userName} created` });
  else res.status(400).json({ message: "Invalid user data recived" });
});

// @desc Update a user
// @route PATCH /users
// @access Private

const updateUser = asyncHandler(async (req, res) => {
  const { id, userName, roles, activeStatus, password } = req.body;

  if (
    !id ||
    !userName ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof activeStatus !== "boolean"
  )
    return res.status(400).json({ message: "All fields are required" });

  const user = await User.findById(id).exec();

  if (!user) res.status(400).json({ message: "User not found" });

  // Check for duplicate
  const duplicate = await User.findOne({ userName }).lean().exec();
  // Allow updates to the original user
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  user.userName = userName;
  user.roles = roles;

  if (password) {
    // Hashing password
    user.password = await bcrypt.hash(password, 10); // Salt rounds
  }

  const updatedUser = await user.save();
  res.json({ message: `${updatedUser.userName} updated` });
});

// @desc Delete a user
// @route DELETE /users
// @access Private

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ message: "User ID required" });

  const user = await User.findById(id).exec();

  if (!user) return res.status(400).json({ message: "User not found" });

  const deletedUsername = user.userName;

  await user.deleteOne();

  const reply = `Username ${deletedUsername} with ID ${id} deleted`;
  res.json(reply);
});

const handleNewUser = asyncHandler(async (req, res) => {});

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
  handleNewUser,
};
