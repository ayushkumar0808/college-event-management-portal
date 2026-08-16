const User = require("../models/User");
const Event = require("../models/Event");
const EventRegistration = require("../models/EventRegistration");

const getAllUsers = async (req, res) => {
  try {
    const {
      role,
      search,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};

    // Filter by role
    if (role) {
      filter.role = role;
    }

    // Search by name or email
    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const pageNumber = Math.max(parseInt(page) || 1, 1);
    const limitNumber = Math.min(parseInt(limit) || 10, 50);
    const skip = (pageNumber - 1) * limitNumber;

    const [users, totalUsers] = await Promise.all([
      User.find(filter)
        .select("-password")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNumber),

      User.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users,
      pagination: {
        currentPage: pageNumber,
        totalPages: Math.ceil(totalUsers / limitNumber),
        totalUsers,
        limit: limitNumber,
      },
    });
  } catch (error) {
    console.error("Get All Users Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



const updateUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { isActive } = req.body;

    // Validate isActive
    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isActive must be true or false",
      });
    }

    // Admin cannot block/unblock themselves
    if (userId === req.user.userId.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot change your own account status",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.isActive = isActive;

    await user.save();

    return res.status(200).json({
      success: true,
      message: isActive
        ? "User activated successfully"
        : "User blocked successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    console.error("Update User Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalStudents,
      totalOrganizers,
      totalAdmins,
      activeUsers,
      blockedUsers,
      totalEvents,
      totalRegistrations,
    ] = await Promise.all([
      User.countDocuments(),

      User.countDocuments({ role: "student" }),

      User.countDocuments({ role: "organizer" }),

      User.countDocuments({ role: "admin" }),

      User.countDocuments({ isActive: true }),

      User.countDocuments({ isActive: false }),

      Event.countDocuments(),

      EventRegistration.countDocuments({
        status: "registered",
      }),
    ]);

    return res.status(200).json({
      success: true,
      message: "Dashboard statistics fetched successfully",

      stats: {
        totalUsers,
        totalStudents,
        totalOrganizers,
        totalAdmins,
        activeUsers,
        blockedUsers,
        totalEvents,
        totalRegistrations,
      },
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getAllUsers,
  updateUserStatus,
  getDashboardStats,
};