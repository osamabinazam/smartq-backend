import LocationController from "../controllers/LocationController.js";
import authenticateToken from "../middlewares/authorization.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";
import express from "express";
const router = express.Router();

// Location Routes
router.post("/location", authenticateToken, authorizeRoles("vendor"), LocationController.createLocation);
router.get("/location", authenticateToken, authorizeRoles("vendor", "customer"), LocationController.getAllLocations);
router.get("/location/:id", authenticateToken, authorizeRoles("vendor", "customer"), LocationController.getLocationById);
router.put("/location/:id", authenticateToken, authorizeRoles("vendor"), LocationController.updateLocation);
router.delete("/location/:id", authenticateToken, authorizeRoles("vendor"), LocationController.deleteLocation);
router.get("/location/vendor/:id", authenticateToken, authorizeRoles("vendor"), LocationController.getLocationsByVendorProfileId);



export default router;