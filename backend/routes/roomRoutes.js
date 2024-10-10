const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");
const verifyJWT = require("../middleware/verifyJWT");
const verifyRoles = require("../middleware/verifyRoles");

router
  .route("/")
  .get(verifyJWT, verifyRoles("Admin"), roomController.getAllRooms)
  .post(verifyJWT, verifyRoles("Admin"), roomController.createNewRoom)
  .patch(verifyJWT, verifyRoles("Admin"), roomController.updateRoom)
  .delete(verifyJWT, verifyRoles("Admin"), roomController.deleteRoom);

module.exports = router;
