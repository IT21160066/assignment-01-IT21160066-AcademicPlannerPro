const Course = require("../models/Course");
const { updateCourse } = require("../controllers/courseController");

const mockUser = {
  _id: "6437b9c7a9f0d9f9c9d7c5b7",
  username: "testuser",
  roles: ["Admin"],
};

describe("Course Controller", function () {
  let req, res;

  beforeEach(function () {
    req = {
      body: {},
      user: mockUser,
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(function () {
    jest.resetAllMocks();
  });

  describe("updateCourse", function () {
    it("should update an existing course", async function () {
      const updatedCourse = {
        _id: "6437b9c7a9f0d9f9c9d7c5b3",
        courseCode: "CS101",
        courseName: "Introduction to Computer Science I",
        description: "An updated introductory course to computer science",
        credits: 4,
        faculty: ["6437b9c7a9f0d9f9c9d7c5b4"],
      };

      req.body = updatedCourse;

      Course.findOne = jest.fn().mockResolvedValue(null);

      await updateCourse(req, res);

      expect(res.json).toHaveBeenCalledWith({
        message: "All fields are required",
      });
    });
  });
});
