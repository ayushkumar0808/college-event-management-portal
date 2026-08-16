const express = require("express");

const {
  createEvent,
  getAllEvents,
  getEventById,
  getMyEvents,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Get All Published Events
router.get("/", getAllEvents);

// Get logged-in organizer's events
router.get(
  "/my",
  protect,
  authorizeRoles("organizer", "admin"),
  getMyEvents
);

// Get Single Event
router.get("/:id", getEventById);

// Create Event
router.post(
  "/",
  protect,
  authorizeRoles("organizer", "admin"),
  createEvent
);

router.put(
  "/:id",
  protect,
  authorizeRoles("organizer", "admin"),
  updateEvent
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("organizer", "admin"),
  deleteEvent
);
module.exports = router;