const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

jest.mock("../models/User");
jest.mock("bcrypt");

describe("User Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createNewUser", () => {
    it("should return an error message when required fields are missing", async () => {
      const req = { body: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await createNewUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "All field are required",
      });
    });
  });

  describe("updateUser", () => {
    it("should return an error message when required fields are missing", async () => {
      const req = { body: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "All fields are required",
      });
    });
  });

  describe("deleteUser", () => {
    it("should return an error message when user ID is missing", async () => {
      const req = { body: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "User ID required" });
    });
  });
});
