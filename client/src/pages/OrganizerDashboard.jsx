import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const OrganizerDashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Organizer Dashboard</h1>

      <p>Welcome, {user?.name}</p>

      <div>
        <Link to="/organizer/events">
          <button>My Events</button>
        </Link>

        <Link to="/organizer/events/create">
          <button>Create Event</button>
        </Link>
      </div>
    </div>
  );
};

export default OrganizerDashboard;