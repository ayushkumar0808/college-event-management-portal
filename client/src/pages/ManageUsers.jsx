import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/manage-users.css";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await api.get("/admin/users");

      setUsers(response.data.users || []);
    } catch (error) {
      console.error("Fetch Users Error:", error);

      setError(error.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleStatusChange = async (userId, isActive) => {
    try {
      const response = await api.patch(`/admin/users/${userId}/status`, {
        isActive,
      });

      const updatedUser = response.data.user;

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId
            ? {
                ...user,
                isActive: updatedUser.isActive,
              }
            : user,
        ),
      );
    } catch (error) {
      console.error("Update User Status Error:", error);

      alert(error.response?.data?.message || "Failed to update user status");
    }
  };

  if (loading) {
    return (
      <div className="users-page">
        <div className="users-loading">
          <div className="loading-spinner"></div>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="users-page">
        <div className="users-error">
          <span>!</span>
          <h3>Something went wrong</h3>
          <p>{error}</p>
          <button onClick={fetchUsers}>Try Again</button>
        </div>
      </div>
    );
  }

  const activeUsers = users.filter((user) => user.isActive).length;

  const blockedUsers = users.length - activeUsers;

  const students = users.filter((user) => user.role === "student").length;

  const organizers = users.filter((user) => user.role === "organizer").length;

  return (
    <div className="users-page">
      {/* Header */}

      <div className="users-header">
        <div>
          <span className="page-label">ADMINISTRATION</span>

          <h1>Manage Users</h1>

          <p>
            Manage accounts, roles and user access across the college event
            platform.
          </p>
        </div>

        <div className="total-users">
          <span>Total Users</span>
          <strong>{users.length}</strong>
        </div>
      </div>

      {/* Statistics */}

      <div className="user-stats">
        <div className="user-stat-card">
          <div className="stat-icon total">U</div>

          <div>
            <span>Total Users</span>
            <strong>{users.length}</strong>
          </div>
        </div>

        <div className="user-stat-card">
          <div className="stat-icon active">✓</div>

          <div>
            <span>Active Users</span>
            <strong>{activeUsers}</strong>
          </div>
        </div>

        <div className="user-stat-card">
          <div className="stat-icon blocked">!</div>

          <div>
            <span>Blocked Users</span>
            <strong>{blockedUsers}</strong>
          </div>
        </div>

        <div className="user-stat-card">
          <div className="stat-icon student">S</div>

          <div>
            <span>Students</span>
            <strong>{students}</strong>
          </div>
        </div>

        <div className="user-stat-card">
          <div className="stat-icon organizer">O</div>

          <div>
            <span>Organizers</span>
            <strong>{organizers}</strong>
          </div>
        </div>
      </div>

      {/* Users Table */}

      <div className="users-card">
        <div className="users-card-header">
          <div>
            <h2>All Users</h2>
            <p>{users.length} registered accounts</p>
          </div>
        </div>

        {users.length === 0 ? (
          <div className="empty-users">
            <div className="empty-icon">U</div>

            <h3>No users found</h3>

            <p>There are no registered users yet.</p>
          </div>
        ) : (
          <div className="users-table-wrapper">
            <table className="users-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    {/* User */}

                    <td>
                      <div className="table-user">
                        <div className="table-avatar">
                          {user.name?.charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <strong>{user.name}</strong>

                          <span>ID: {user._id.slice(-6)}</span>
                        </div>
                      </div>
                    </td>

                    {/* Email */}

                    <td>
                      <span className="email-text">{user.email}</span>
                    </td>

                    {/* Role */}

                    <td>
                      <span className={`role-badge role-${user.role}`}>
                        {user.role}
                      </span>
                    </td>

                    {/* Status */}

                    <td>
                      <span
                        className={`status-badge ${
                          user.isActive ? "status-active" : "status-blocked"
                        }`}
                      >
                        <span className="status-dot"></span>

                        {user.isActive ? "Active" : "Blocked"}
                      </span>
                    </td>

                    {/* Action */}

                    <td>
                      <button
                        className={`status-button ${
                          user.isActive ? "block-button" : "unblock-button"
                        }`}
                        onClick={() =>
                          handleStatusChange(user._id, !user.isActive)
                        }
                      >
                        {user.isActive ? "Block User" : "Unblock User"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;












































// import { useEffect, useState } from "react";
// import api from "../services/api";

// const ManageUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchUsers = async () => {
//     try {
//       const response = await api.get("/admin/users");

//       setUsers(response.data.users || []);
//     } catch (error) {
//       console.error("Fetch Users Error:", error);

//       setError(
//         error.response?.data?.message ||
//           "Failed to load users"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleStatusChange = async (userId, isActive) => {
//     try {
//       const response = await api.patch(
//         `/admin/users/${userId}/status`,
//         {
//           isActive,
//         }
//       );

//       const updatedUser = response.data.user;

//       setUsers((prevUsers) =>
//         prevUsers.map((user) =>
//           user._id === userId
//             ? {
//                 ...user,
//                 isActive: updatedUser.isActive,
//               }
//             : user
//         )
//       );
//     } catch (error) {
//       console.error(
//         "Update User Status Error:",
//         error
//       );

//       alert(
//         error.response?.data?.message ||
//           "Failed to update user status"
//       );
//     }
//   };

//   if (loading) {
//     return <h2>Loading users...</h2>;
//   }

//   if (error) {
//     return <h2>{error}</h2>;
//   }

//   return (
//     <div>
//       <h1>Manage Users</h1>

//       {users.length === 0 ? (
//         <p>No users found.</p>
//       ) : (
//         <div>
//           {users.map((user) => (
//             <div key={user._id}>
//               <h3>{user.name}</h3>

//               <p>Email: {user.email}</p>

//               <p>Role: {user.role}</p>

//               <p>
//                 Status:{" "}
//                 {user.isActive
//                   ? "Active"
//                   : "Blocked"}
//               </p>

//               {user.isActive ? (
//                 <button
//                   onClick={() =>
//                     handleStatusChange(
//                       user._id,
//                       false
//                     )
//                   }
//                 >
//                   Block User
//                 </button>
//               ) : (
//                 <button
//                   onClick={() =>
//                     handleStatusChange(
//                       user._id,
//                       true
//                     )
//                   }
//                 >
//                   Unblock User
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageUsers;
