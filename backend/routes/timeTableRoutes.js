const express = require("express");
const router = express.Router();
const timeTableController = require("../controllers/timeTableController");
const verifyJWT = require("../middleware/verifyJWT");
const verifyRoles = require("../middleware/verifyRoles");

router
  .route("/")
  .get(
    verifyJWT,
    verifyRoles("Student", "Admin", "FacultyAdmin"),
    timeTableController.getAllTimeTables
  )
  .delete(verifyJWT, verifyRoles("Admin"), timeTableController.deleteTimeTable);

module.exports = router;
