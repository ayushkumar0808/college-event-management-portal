import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav>
      <div>
        <Link to="/">College Events</Link>
      </div>

      <div>
        <Link to="/events">Events</Link>

        {user.role === "student" && (
          <Link to="/my-registrations">My Registrations</Link>
        )}

        {user.role === "organizer" && (
          <Link to="/organizer">Organizer Dashboard</Link>
        )}

        {user.role === "admin" && (
          <>
            <Link to="/admin">Admin Dashboard</Link>

            <Link to="/admin/users">Manage Users</Link>
          </>
        )}
        <span>
          {user.name} ({user.role})
        </span>

        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
