// const express = require("express");
// const router = express.Router();
// const resourceController = require("../controllers/resourceController");
// const verifyJWT = require("../middleware/verifyJWT");
// const verifyRoles = require("../middleware/verifyRoles");

// router
//   .route("/")
//   .get(
//     verifyJWT,
//     verifyRoles("Admin", "FacultyAdmin"),
//     resourceController.getAllResources
//   )
//   .post(
//     verifyJWT,
//     verifyRoles("Admin", "FacultyAdmin"),
//     resourceController.createNewResource
//   )
//   .patch(
//     verifyJWT,
//     verifyRoles("Admin", "FacultyAdmin"),
//     resourceController.updateResource
//   )
//   .delete(
//     verifyJWT,
//     verifyRoles("Admin", "FacultyAdmin"),
//     resourceController.deleteResource
//   );

// module.exports = router;
