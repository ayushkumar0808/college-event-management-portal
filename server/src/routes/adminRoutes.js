const express = require("express");

const {
  getAllUsers,
  updateUserStatus,
  getDashboardStats,
} = require("../controllers/adminController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Admin - Get all users
router.get(
  "/users",
  protect,
  authorizeRoles("admin"),
  getAllUsers
);

router.patch(
  "/users/:userId/status",
  protect,
  authorizeRoles("admin"),
  updateUserStatus
);

router.get(
  "/dashboard",
  protect,
  authorizeRoles("admin"),
  getDashboardStats
);

module.exports = router;