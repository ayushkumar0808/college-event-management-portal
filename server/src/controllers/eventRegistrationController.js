const Event = require("../models/Event");
const EventRegistration = require("../models/EventRegistration");

const registerForEvent = async (req, res) => {
  try {
    const { id: eventId } = req.params;
    const studentId = req.user.userId;

    // Check event exists
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Check event status
    if (event.status !== "published") {
      return res.status(400).json({
        success: false,
        message: "Registration is not available for this event",
      });
    }

    // Check registration deadline
    if (new Date() > new Date(event.registrationDeadline)) {
      return res.status(400).json({
        success: false,
        message: "Registration deadline has passed",
      });
    }

    // Check event date
    if (new Date() >= new Date(event.eventDate)) {
      return res.status(400).json({
        success: false,
        message: "This event has already started",
      });
    }

    // Check existing registration
    const existingRegistration = await EventRegistration.findOne({
      event: eventId,
      student: studentId,
    });

    if (existingRegistration) {
      if (existingRegistration.status === "registered") {
        return res.status(409).json({
          success: false,
          message: "You are already registered for this event",
        });
      }

      // Allow re-registration after cancellation
      existingRegistration.status = "registered";
      existingRegistration.attendance = "not-marked";
      existingRegistration.registeredAt = new Date();

      await existingRegistration.save();

      return res.status(200).json({
        success: true,
        message: "Registration successful",
        registration: existingRegistration,
      });
    }

    // Check capacity
    const registeredCount = await EventRegistration.countDocuments({
      event: eventId,
      status: "registered",
    });

    if (registeredCount >= event.maxParticipants) {
      return res.status(400).json({
        success: false,
        message: "Event is full",
      });
    }

    // Create registration
    const registration = await EventRegistration.create({
      event: eventId,
      student: studentId,
    });

    return res.status(201).json({
      success: true,
      message: "Event registration successful",
      registration,
    });
  } catch (error) {
    console.error("Event Registration Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


const getMyRegistrations = async (req, res) => {
  try {
    const studentId = req.user.userId;

    const registrations = await EventRegistration.find({
      student: studentId,
    })
      .populate(
        "event",
        "title description category venue eventDate registrationDeadline banner status"
      )
      .sort({ registeredAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Registrations fetched successfully",
      count: registrations.length,
      registrations,
    });
  } catch (error) {
    console.error("Get My Registrations Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getEventRegistrations = async (req, res) => {
  try {
    const { id: eventId } = req.params;

    // Check event exists
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Organizer can view only their own event registrations
    if (
      req.user.role !== "admin" &&
      event.organizer.toString() !== req.user.userId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You can only view registrations for your own events",
      });
    }

    const registrations = await EventRegistration.find({
      event: eventId,
      status: "registered",
    })
      .populate(
        "student",
        "name email phone profileImage"
      )
      .sort({ registeredAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Event registrations fetched successfully",
      event: {
        id: event._id,
        title: event.title,
        maxParticipants: event.maxParticipants,
      },
      count: registrations.length,
      registrations,
    });
  } catch (error) {
    console.error("Get Event Registrations Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const cancelRegistration = async (req, res) => {
  try {
    const { id: eventId } = req.params;
    const studentId = req.user.userId;

    const registration = await EventRegistration.findOne({
      event: eventId,
      student: studentId,
    });

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found",
      });
    }

    if (registration.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Registration is already cancelled",
      });
    }

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Don't allow cancellation after event starts
    if (new Date() >= new Date(event.eventDate)) {
      return res.status(400).json({
        success: false,
        message: "Registration cannot be cancelled after the event starts",
      });
    }

    registration.status = "cancelled";

    await registration.save();

    return res.status(200).json({
      success: true,
      message: "Registration cancelled successfully",
      registration,
    });
  } catch (error) {
    console.error("Cancel Registration Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const markAttendance = async (req, res) => {
  try {
    const { eventId, registrationId } = req.params;
    const { attendance } = req.body;

    // Validate attendance value
    if (!["present", "absent"].includes(attendance)) {
      return res.status(400).json({
        success: false,
        message: "Attendance must be either present or absent",
      });
    }

    // Check event
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Organizer can manage only their own event
    if (
      req.user.role !== "admin" &&
      event.organizer.toString() !== req.user.userId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You can only manage attendance for your own events",
      });
    }

    // Find registration
    const registration = await EventRegistration.findOne({
      _id: registrationId,
      event: eventId,
      status: "registered",
    });

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Active registration not found",
      });
    }

    // Update attendance
    registration.attendance = attendance;

    await registration.save();

    return res.status(200).json({
      success: true,
      message: "Attendance updated successfully",
      registration,
    });
  } catch (error) {
    console.error("Mark Attendance Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  registerForEvent,
  getMyRegistrations,
  cancelRegistration,
  getEventRegistrations,
  markAttendance,
};