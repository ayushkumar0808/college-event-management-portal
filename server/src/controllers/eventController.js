const Event = require("../models/Event");
const { createEventSchema } = require("../validators/eventValidator");

const createEvent = async (req, res) => {
  try {
    // Validate request data
    const { error, value } = createEventSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const {
      title,
      description,
      category,
      venue,
      eventDate,
      registrationDeadline,
      maxParticipants,
      banner,
    } = value;

    // Validate dates
    const currentDate = new Date();
    const eventDateTime = new Date(eventDate);
    const deadlineDateTime = new Date(registrationDeadline);

    if (deadlineDateTime >= eventDateTime) {
      return res.status(400).json({
        success: false,
        message: "Registration deadline must be before the event date",
      });
    }

    if (eventDateTime <= currentDate) {
      return res.status(400).json({
        success: false,
        message: "Event date must be in the future",
      });
    }

    // Create event
    const event = await Event.create({
      title,
      description,
      category,
      venue,
      eventDate: eventDateTime,
      registrationDeadline: deadlineDateTime,
      maxParticipants,
      banner,
      organizer: req.user.userId,
      status: "published",
    });

    return res.status(201).json({
      success: true,
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    console.error("Create Event Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const {
      search,
      category,
      status = "published",
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {
      status,
    };

    // Search by title
    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }

    // Filter by category
    if (category) {
      filter.category = category;
    }

    const pageNumber = Math.max(parseInt(page) || 1, 1);
    const limitNumber = Math.min(parseInt(limit) || 10, 50);
    const skip = (pageNumber - 1) * limitNumber;

    const [events, totalEvents] = await Promise.all([
      Event.find(filter)
        .populate("organizer", "name email profileImage")
        .sort({ eventDate: 1 })
        .skip(skip)
        .limit(limitNumber),

      Event.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      message: "Events fetched successfully",
      events,
      pagination: {
        currentPage: pageNumber,
        totalPages: Math.ceil(totalEvents / limitNumber),
        totalEvents,
        limit: limitNumber,
      },
    });
  } catch (error) {
    console.error("Get Events Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({
      organizer: req.user.userId,
    })
      .populate("organizer", "name email profileImage")
      .sort({ eventDate: 1 });

    return res.status(200).json({
      success: true,
      message: "My events fetched successfully",
      count: events.length,
      events,
    });
  } catch (error) {
    console.error("Get My Events Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id).populate(
      "organizer",
      "name email profileImage",
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Event fetched successfully",
      event,
    });
  } catch (error) {
    console.error("Get Event Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    // Find event
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Organizer can update only their own event
    if (
      req.user.role !== "admin" &&
      event.organizer.toString() !== req.user.userId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own events",
      });
    }

    // Validate update data
    const { error, value } = createEventSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const {
      title,
      description,
      category,
      venue,
      eventDate,
      registrationDeadline,
      maxParticipants,
      banner,
    } = value;

    // Validate dates
    const eventDateTime = new Date(eventDate);
    const deadlineDateTime = new Date(registrationDeadline);

    if (deadlineDateTime >= eventDateTime) {
      return res.status(400).json({
        success: false,
        message: "Registration deadline must be before the event date",
      });
    }

    // Update event
    event.title = title;
    event.description = description;
    event.category = category;
    event.venue = venue;
    event.eventDate = eventDateTime;
    event.registrationDeadline = deadlineDateTime;
    event.maxParticipants = maxParticipants;
    event.banner = banner;

    await event.save();

    return res.status(200).json({
      success: true,
      message: "Event updated successfully",
      event,
    });
  } catch (error) {
    console.error("Update Event Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Organizer can delete only their own event
    if (
      req.user.role !== "admin" &&
      event.organizer.toString() !== req.user.userId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own events",
      });
    }

    await Event.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error("Delete Event Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  getMyEvents,
  updateEvent,
  deleteEvent,
};
