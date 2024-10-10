const express = require("express");
const router = express.Router();
const studentEnrollController = require("../controllers//studentEnrollController");
const verifyJWT = require("../middleware/verifyJWT");
const verifyRoles = require("../middleware/verifyRoles");

router
  .route("/")
  .get(
    verifyJWT,
    verifyRoles("Admin", "FacultyAdmin"),
    studentEnrollController.getAllEnrollments
  )
  .post(
    verifyJWT,
    verifyRoles("Student", "Admin", "FacultyAdmin"),
    studentEnrollController.enrollStudents
  )
  .patch(
    verifyJWT,
    verifyRoles("Admin", "FacultyAdmin"),
    studentEnrollController.updateEnrollments
  )
  .delete(
    verifyJWT,
    verifyRoles("Admin", "FacultyAdmin"),
    studentEnrollController.deleteEnrollments
  );

module.exports = router;
