import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/admin.css";

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

        setError(error.response?.data?.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-error">
        <div className="error-icon">!</div>
        <h2>Something went wrong</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <main className="admin-dashboard">
      {/* HEADER */}

      <section className="admin-header">
        <div>
          <span className="admin-eyebrow">ADMINISTRATION</span>

          <h1>Dashboard</h1>

          <p>Monitor your college event platform from one place.</p>
        </div>

        <div className="admin-status">
          <span className="status-dot"></span>
          System Active
        </div>
      </section>

      {/* PRIMARY STATS */}

      <section className="stats-grid">
        <div className="stat-card stat-primary">
          <div className="stat-top">
            <span>Total Users</span>
            <div className="stat-icon">U</div>
          </div>

          <strong>{stats.totalUsers}</strong>

          <p>Registered accounts</p>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Total Events</span>
            <div className="stat-icon">E</div>
          </div>

          <strong>{stats.totalEvents}</strong>

          <p>Events on platform</p>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Registrations</span>
            <div className="stat-icon">R</div>
          </div>

          <strong>{stats.totalRegistrations}</strong>

          <p>Active registrations</p>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Active Users</span>
            <div className="stat-icon">A</div>
          </div>

          <strong>{stats.activeUsers}</strong>

          <p>Currently active</p>
        </div>
      </section>

      {/* USER OVERVIEW */}

      <section className="admin-section">
        <div className="section-heading">
          <div>
            <span>USER OVERVIEW</span>
            <h2>Platform users</h2>
          </div>

          <span className="section-badge">{stats.totalUsers} total</span>
        </div>

        <div className="user-overview-grid">
          {/* STUDENTS */}

          <div className="overview-card">
            <div className="overview-icon student">S</div>

            <div>
              <span>Students</span>
              <strong>{stats.totalStudents}</strong>
            </div>
          </div>

          {/* ORGANIZERS */}

          <div className="overview-card">
            <div className="overview-icon organizer">O</div>

            <div>
              <span>Organizers</span>
              <strong>{stats.totalOrganizers}</strong>
            </div>
          </div>

          {/* ADMINS */}

          <div className="overview-card">
            <div className="overview-icon admin">A</div>

            <div>
              <span>Administrators</span>
              <strong>{stats.totalAdmins}</strong>
            </div>
          </div>

          {/* BLOCKED */}

          <div className="overview-card">
            <div className="overview-icon blocked">B</div>

            <div>
              <span>Blocked Users</span>
              <strong>{stats.blockedUsers}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORM HEALTH */}

      <section className="admin-section">
        <div className="section-heading">
          <div>
            <span>PLATFORM HEALTH</span>
            <h2>Account status</h2>
          </div>
        </div>

        <div className="health-card">
          <div className="health-info">
            <div className="health-icon">✓</div>

            <div>
              <h3>Active accounts</h3>
              <p>Users currently able to access the platform.</p>
            </div>
          </div>

          <div className="health-number">{stats.activeUsers}</div>
        </div>

        <div className="health-card blocked-health">
          <div className="health-info">
            <div className="health-icon blocked-icon">!</div>

            <div>
              <h3>Blocked accounts</h3>
              <p>Users currently restricted from accessing the platform.</p>
            </div>
          </div>

          <div className="health-number">{stats.blockedUsers}</div>
        </div>
      </section>
    </main>
  );
};

export default AdminDashboard;

























// import { useEffect, useState } from "react";
// import api from "../services/api";

// const AdminDashboard = () => {
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const response = await api.get("/admin/dashboard");

//         setStats(response.data.stats);
//       } catch (error) {
//         console.error("Dashboard Stats Error:", error);

//         setError(
//           error.response?.data?.message ||
//             "Failed to load dashboard"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   if (loading) {
//     return <h2>Loading dashboard...</h2>;
//   }

//   if (error) {
//     return <h2>{error}</h2>;
//   }

//   return (
//     <div>
//       <h1>Admin Dashboard</h1>

//       <div>
//         <div>
//           <h3>Total Users</h3>
//           <p>{stats.totalUsers}</p>
//         </div>

//         <div>
//           <h3>Students</h3>
//           <p>{stats.totalStudents}</p>
//         </div>

//         <div>
//           <h3>Organizers</h3>
//           <p>{stats.totalOrganizers}</p>
//         </div>

//         <div>
//           <h3>Admins</h3>
//           <p>{stats.totalAdmins}</p>
//         </div>

//         <div>
//           <h3>Active Users</h3>
//           <p>{stats.activeUsers}</p>
//         </div>

//         <div>
//           <h3>Blocked Users</h3>
//           <p>{stats.blockedUsers}</p>
//         </div>

//         <div>
//           <h3>Total Events</h3>
//           <p>{stats.totalEvents}</p>
//         </div>

//         <div>
//           <h3>Total Registrations</h3>
//           <p>{stats.totalRegistrations}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
