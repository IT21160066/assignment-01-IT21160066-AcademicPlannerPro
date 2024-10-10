// const Resource = require("../models/Resource");
// const asyncHandler = require("express-async-handler");

// // @desc Get all resources
// // @route GET /resources
// // @access Private

// const getAllResources = async (req, res) => {
//   try {
//     const resources = await Resource.find().lean();
//     if (!resources?.length)
//       return res.status(400).json({ message: "No resources found" });

//     res.json(resources);
//   } catch (error) {
//     console.log("Error fetching Resources" + error);
//     res.status(500).json({ message: "Internal Server error" });
//   }
// };

// // @desc Create new resource
// // @route POST /resources
// // @access Private

// const createNewResource = async (req, res) => {
//   try {
//     const { resourceName, resourceCode } = req.body;

//     // Confirming data
//     if (!resourceName || !resourceCode)
//       return res.status(400).json({ message: "All field are required" });

//     // Check for duplicates
//     const duplicate = await Resource.findOne({ resourceName }).lean().exec();
//     if (duplicate)
//       return res.status(409).json({ message: "Duplicate resource name" });

//     // Create and store new resource
//     const resource = await Resource.create({ resourceName, resourceCode });
//     if (resource)
//       res.status(201).json({ message: `New Resouce ${resourceName} created` });
//     else res.status(400).json({ message: "Invalid Resource data recived" });
//   } catch (error) {
//     console.error("Error creating resource:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// // @desc Update a resource
// // @route PATCH /resources
// // @access Private

// const updateResource = async (req, res) => {
//   try {
//     const { id, resourceName, resourceCode, availabilty } = req.body;

//     // Confirm data
//     if (
//       !id ||
//       !resourceName ||
//       !resourceCode ||
//       typeof availabilty !== "boolean"
//     )
//       return res.status(400).json({ message: "All fileds are required" });

//     const resource = await Resource.findById(id).exec();
//     if (!resource)
//       return res.status(400).json({ message: "Resource not found" });

//     // Check for duplicates
//     const duplicate = await Resource.findOne({ resourceName }).lean().exec();
//     if (duplicate && duplicate?._id.toString() !== id)
//       return res.status(409).json({ message: "Duplicate Resource name" });

//     resource.resourceName = resourceName;
//     resource.resourceCode = resourceCode;
//     resource.availabilty = availabilty;

//     const updatedResource = await resource.save();
//     res.json({ message: `${updatedResource.resourceName} updated` });
//   } catch (error) {
//     console.error("Error updating Resource:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// // @desc Delete a resource
// // @route DELETE /resources
// // @access Private

// const deleteResource = async (req, res) => {
//   try {
//     const { id } = req.body;

//     if (!id) return res.status(400).json({ message: "Resource ID required" });

//     const resource = await Resource.findById(id).exec();

//     if (!resource)
//       return res.status(404).json({ message: "Resource not found" });

//     const resourceName = resource.resourceName;

//     await resource.deleteOne();

//     const reply = `Resource ${resourceName} with Id ${id} is deleted`;
//     res.json(reply);
//   } catch (error) {
//     console.error("Error deleting resource:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// module.exports = {
//   getAllResources,
//   createNewResource,
//   updateResource,
//   deleteResource,
// };
