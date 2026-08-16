import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/events");

        setEvents(response.data.events || []);
      } catch (error) {
        console.error("Fetch Events Error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load events"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <h2>Loading events...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>College Events</h1>

      {events.length === 0 ? (
        <p>No events available.</p>
      ) : (
        <div>
          {events.map((event) => (
            <div key={event._id}>
              <h2>{event.title}</h2>

              <p>
                {event.description}
              </p>

              <p>
                Category: {event.category}
              </p>

              <p>
                Venue: {event.venue}
              </p>

              <p>
                Date:{" "}
                {new Date(event.eventDate).toLocaleDateString()}
              </p>

              <Link to={`/events/${event._id}`}>
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;