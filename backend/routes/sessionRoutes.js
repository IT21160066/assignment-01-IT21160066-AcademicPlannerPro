const express = require("express");
const router = express.Router();
const sessionController = require("../controllers/sessionController");
const verifyJWT = require("../middleware/verifyJWT");
const verifyRoles = require("../middleware/verifyRoles");

router
  .route("/")
  .get(
    verifyJWT,
    verifyRoles("Admin", "FacultyAdmin"),
    sessionController.getAllSessions
  )
  .post(
    verifyJWT,
    verifyRoles("Admin", "FacultyAdmin"),
    sessionController.createSessionForTimeTable
  )
  .patch(
    verifyJWT,
    verifyRoles("Admin", "FacultyAdmin"),
    sessionController.updateSession
  )
  .delete(
    verifyJWT,
    verifyRoles("Admin", "FacultyAdmin"),
    sessionController.deleteSession
  );

module.exports = router;
