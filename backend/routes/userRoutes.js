const express = require("express");
const router = express.Router();
const usersController = require("../controllers/userController");
const verifyJWT = require("../middleware/verifyJWT");
const verifyRoles = require("../middleware/verifyRoles");

// router.use(verifyJWT);

router
  .route("/")
  .get(
    verifyJWT,
    verifyRoles("Admin", "FacultyAdmin"),
    usersController.getAllUsers
  )
  .post(verifyJWT, usersController.createNewUser)
  .patch(verifyJWT, verifyRoles("Admin"), usersController.updateUser)
  .delete(verifyJWT, verifyRoles("Admin"), usersController.deleteUser);

module.exports = router;
