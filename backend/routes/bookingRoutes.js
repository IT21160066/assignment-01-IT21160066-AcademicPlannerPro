const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const verifyJWT = require("../middleware/verifyJWT");
const verifyRoles = require("../middleware/verifyRoles");

router
  .route("/")
  .get(
    verifyJWT,
    verifyRoles("Admin", "FacultyAdmin"),
    bookingController.getAllBookings
  )
  .post(verifyJWT, verifyRoles("Admin"), bookingController.createNewBooking)
  .patch(verifyJWT, verifyRoles("Admin"), bookingController.updateBooking)
  .delete(verifyJWT, verifyRoles("Admin"), bookingController.deleteBooking);

module.exports = router;
