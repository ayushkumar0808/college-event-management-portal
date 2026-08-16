import { useEffect, useState } from "react";
import api from "../services/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/admin/dashboard");

        setStats(response.data.stats);
      } catch (error) {
        console.error("Dashboard Stats Error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <h2>Loading dashboard...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <div>
        <div>
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>

        <div>
          <h3>Students</h3>
          <p>{stats.totalStudents}</p>
        </div>

        <div>
          <h3>Organizers</h3>
          <p>{stats.totalOrganizers}</p>
        </div>

        <div>
          <h3>Admins</h3>
          <p>{stats.totalAdmins}</p>
        </div>

        <div>
          <h3>Active Users</h3>
          <p>{stats.activeUsers}</p>
        </div>

        <div>
          <h3>Blocked Users</h3>
          <p>{stats.blockedUsers}</p>
        </div>

        <div>
          <h3>Total Events</h3>
          <p>{stats.totalEvents}</p>
        </div>

        <div>
          <h3>Total Registrations</h3>
          <p>{stats.totalRegistrations}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;