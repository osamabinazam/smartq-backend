
const OperatingHourController = require("../controllers/OperatingHourController.js");
const authenticateToken = require("../middlewares/authorization.js");
const authorizeRoles = require("../middlewares/authorizeRoles.js");
const express = require("express");
const router = express.Router();

router.post("/create", authenticateToken, authorizeRoles("vendor"), OperatingHourController.createOperatingHours);
// router.get("/operatinghours", authenticateToken, authorizeRoles("vendor", "customer"), OperatingHourController.getAllOperatingHours);
// router.get("/:id", authenticateToken, authorizeRoles("vendor", "customer"), OperatingHourController.getOperatingHoursById);
router.put("/:id", authenticateToken, authorizeRoles("vendor"), OperatingHourController.updateOperatingHours);
router.delete("/:id", authenticateToken, authorizeRoles("vendor"), OperatingHourController.deleteOperatingHours);
router.get("/vendor/:id", authenticateToken, authorizeRoles("vendor"), OperatingHourController.getOperatingHoursByProfileId);

module.exports = router;