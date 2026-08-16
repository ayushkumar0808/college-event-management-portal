const express = require("express");

const {
  registerForEvent,
  getMyRegistrations,
  cancelRegistration,
  getEventRegistrations,
  markAttendance,
} = require("../controllers/eventRegistrationController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Get logged-in student's registrations
router.get(
  "/registrations/my",
  protect,
  authorizeRoles("student"),
  getMyRegistrations
);


// Student registers for an event
router.post(
  "/events/:id/register",
  protect,
  authorizeRoles("student"),
  registerForEvent
);

router.delete(
  "/events/:id/register",
  protect,
  authorizeRoles("student"),
  cancelRegistration
);

// Organizer/Admin - View event registrations
router.get(
  "/events/:id/registrations",
  protect,
  authorizeRoles("organizer", "admin"),
  getEventRegistrations
);

router.patch(
  "/events/:eventId/registrations/:registrationId/attendance",
  protect,
  authorizeRoles("organizer", "admin"),
  markAttendance
);

module.exports = router;