const CategoryController = require("../controllers/CategoryController.js");
const authenticateToken = require("../middlewares/authorization.js");
const authorizeRoles = require("../middlewares/authorizeRoles.js");
const express = require("express");
const router = express.Router();

// Category Routes
router.post("/", authenticateToken, authorizeRoles("admin"), CategoryController.createCategory);
router.get("/:id", authenticateToken, authorizeRoles("admin", "customer", "vendor"), CategoryController.getAllCategories);
router.get("/:id", authenticateToken, authorizeRoles("admin", "customer", "vendor"), CategoryController.getCategoryById);
router.put("/:id", authenticateToken, authorizeRoles("admin"), CategoryController.updateCategory);
router.delete("/:id", authenticateToken, authorizeRoles("admin"), CategoryController.deleteCategory);

module.exports = router;