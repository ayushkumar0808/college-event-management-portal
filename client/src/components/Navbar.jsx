import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => {
    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  };

  return (
    <nav className="premium-navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="navbar-brand">
          <div className="brand-icon">
            CE
          </div>

          <div className="brand-text">
            <span className="brand-title">
              College Events
            </span>

            <span className="brand-subtitle">
              Event Management
            </span>
          </div>
        </Link>


        {/* Navigation */}
        <div className="navbar-links">

          {/* Events - Everyone */}
          <Link
            to="/events"
            className={`navbar-link ${
              isActive("/events") ? "active" : ""
            }`}
          >
            <span className="nav-icon">◈</span>
            Events
          </Link>


          {/* Student */}
          {user.role === "student" && (
            <Link
              to="/my-registrations"
              className={`navbar-link ${
                isActive("/my-registrations")
                  ? "active"
                  : ""
              }`}
            >
              <span className="nav-icon">▣</span>
              My Registrations
            </Link>
          )}


          {/* Organizer */}
          {user.role === "organizer" && (
            <Link
              to="/organizer"
              className={`navbar-link ${
                isActive("/organizer")
                  ? "active"
                  : ""
              }`}
            >
              <span className="nav-icon">◆</span>
              Organizer
            </Link>
          )}


          {/* Admin */}
          {user.role === "admin" && (
            <>
              <Link
                to="/admin"
                className={`navbar-link ${
                  isActive("/admin") &&
                  !isActive("/admin/users")
                    ? "active"
                    : ""
                }`}
              >
                <span className="nav-icon">◆</span>
                Admin
              </Link>

              <Link
                to="/admin/users"
                className={`navbar-link ${
                  isActive("/admin/users")
                    ? "active"
                    : ""
                }`}
              >
                <span className="nav-icon">♙</span>
                Manage Users
              </Link>
            </>
          )}

        </div>


        {/* User Section */}
        <div className="navbar-user">

          <div className="user-profile">

            <div className="user-avatar">
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.name}
                />
              ) : (
                user.name?.charAt(0).toUpperCase()
              )}
            </div>

            <div className="user-info">

              <span className="user-name">
                {user.name}
              </span>

              <span
                className={`user-role role-${user.role}`}
              >
                {user.role}
              </span>

            </div>

          </div>


          {/* Logout */}
          <button
            className="logout-button"
            onClick={handleLogout}
            title="Logout"
          >
            <span>↪</span>
          </button>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;















// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   if (!user) {
//     return null;
//   }

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <nav>
//       <div>
//         <Link to="/">College Events</Link>
//       </div>

//       <div>
//         <Link to="/events">Events</Link>

//         {user.role === "student" && (
//           <Link to="/my-registrations">My Registrations</Link>
//         )}

//         {user.role === "organizer" && (
//           <Link to="/organizer">Organizer Dashboard</Link>
//         )}

//         {user.role === "admin" && (
//           <>
//             <Link to="/admin">Admin Dashboard</Link>

//             <Link to="/admin/users">Manage Users</Link>
//           </>
//         )}
//         <span>
//           {user.name} ({user.role})
//         </span>

//         <button onClick={handleLogout}>Logout</button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
