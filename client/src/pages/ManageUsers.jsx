import { useEffect, useState } from "react";
import api from "../services/api";

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

      setError(
        error.response?.data?.message ||
          "Failed to load users"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleStatusChange = async (userId, isActive) => {
    try {
      const response = await api.patch(
        `/admin/users/${userId}/status`,
        {
          isActive,
        }
      );

      const updatedUser = response.data.user;

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId
            ? {
                ...user,
                isActive: updatedUser.isActive,
              }
            : user
        )
      );
    } catch (error) {
      console.error(
        "Update User Status Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to update user status"
      );
    }
  };

  if (loading) {
    return <h2>Loading users...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>Manage Users</h1>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div>
          {users.map((user) => (
            <div key={user._id}>
              <h3>{user.name}</h3>

              <p>Email: {user.email}</p>

              <p>Role: {user.role}</p>

              <p>
                Status:{" "}
                {user.isActive
                  ? "Active"
                  : "Blocked"}
              </p>

              {user.isActive ? (
                <button
                  onClick={() =>
                    handleStatusChange(
                      user._id,
                      false
                    )
                  }
                >
                  Block User
                </button>
              ) : (
                <button
                  onClick={() =>
                    handleStatusChange(
                      user._id,
                      true
                    )
                  }
                >
                  Unblock User
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageUsers;