const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const verifyJWT = require("../middleware/verifyJWT");
const verifyRoles = require("../middleware/verifyRoles");

router
  .route("/")
  .get(
    verifyJWT,
    verifyRoles("Student", "Admin", "FacultyAdmin"),
    courseController.getAllCourses
  )
  .post(verifyJWT, verifyRoles("Admin"), courseController.createNewCourse)
  .patch(verifyJWT, verifyRoles("Admin"), courseController.updateCourse)
  .delete(verifyJWT, verifyRoles("Admin"), courseController.deleteCourse);

module.exports = router;
