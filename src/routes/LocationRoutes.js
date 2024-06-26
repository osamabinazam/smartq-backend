const LocationController = require("../controllers/LocationController.js");
const authenticateToken = require("../middlewares/authorization.js");
const authorizeRoles = require("../middlewares/authorizeRoles.js");
const express = require("express");
const router = express.Router();

// Location Routes
router.post("/create", authenticateToken, authorizeRoles("vendor"), LocationController.createLocation);
router.get("/location", authenticateToken, authorizeRoles("vendor", "customer"), LocationController.getAllLocations);
router.get("/:id", authenticateToken, authorizeRoles("vendor", "customer"), LocationController.getLocationById);
router.put("/:id", authenticateToken, authorizeRoles("vendor"), LocationController.updateLocation);
router.delete("/:id", authenticateToken, authorizeRoles("vendor"), LocationController.deleteLocation);
router.get("/vendor/:id", authenticateToken, authorizeRoles("vendor"), LocationController.getLocationsByVendorProfileId);

module.exports = router;
