const express = require("express");
const router = express.Router();
const courseController = require("../controllers/FacultyController");
const verifyJWT = require("../middleware/verifyJWT");
const verifyRoles = require("../middleware/verifyRoles");

router
  .route("/")
  .get(
    verifyJWT,
    verifyRoles("Student", "Admin", "FacultyAdmin"),
    courseController.getAllFaculties
  )
  .post(
    verifyJWT,
    verifyRoles("Admin", "FacultyAdmin"),
    courseController.createNewFaculty
  )
  .patch(
    verifyJWT,
    verifyRoles("Admin", "FacultyAdmin"),
    courseController.updateFaculty
  )
  .delete(
    verifyJWT,
    verifyRoles("Admin", "FacultyAdmin"),
    courseController.deletefaculty
  );

module.exports = router;
