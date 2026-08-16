import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const OrganizerEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const response = await api.get("/events/my");

        setEvents(response.data.events || []);
      } catch (error) {
        console.error("Fetch My Events Error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load your events"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, []);

  if (loading) {
    return <h2>Loading your events...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>My Events</h1>

      <Link to="/organizer/events/create">
        <button>Create Event</button>
      </Link>

      {events.length === 0 ? (
        <p>You have not created any events yet.</p>
      ) : (
        <div>
          {events.map((event) => (
            <div key={event._id}>
              <h2>{event.title}</h2>

              <p>{event.description}</p>

              <p>
                Category: {event.category}
              </p>

              <p>
                Venue: {event.venue}
              </p>

              <p>
                Date:{" "}
                {new Date(
                  event.eventDate
                ).toLocaleDateString()}
              </p>

              <Link
                to={`/organizer/events/${event._id}/registrations`}
              >
                View Registrations
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrganizerEvents;