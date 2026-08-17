import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "../styles/Events.css";

const Events = () => {
  const { user } = useAuth();

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
    return (
      <main className="page">
        <div className="empty-message">
          Loading events...
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page">
        <div className="error-message">
          {error}
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">DISCOVER</p>

          <h1 className="page-title">
            College Events
          </h1>

          <p className="page-subtitle">
            Explore upcoming events, workshops and
            activities happening at your college.
          </p>
        </div>

        <div className="event-count">
          {events.length}{" "}
          {events.length === 1 ? "Event" : "Events"}
        </div>
      </div>

      {events.length === 0 ? (
        <div className="empty-message">
          <h2>No events available</h2>
          <p>
            There are currently no published events.
          </p>
        </div>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <article
              className="event-card"
              key={event._id}
            >
              <div className="event-card-top">
                <span className="category">
                  {event.category}
                </span>

                <span className="event-status">
                  Published
                </span>
              </div>

              <h2>{event.title}</h2>

              <p className="event-description">
                {event.description}
              </p>

              <div className="event-info">
                <div>
                  <span className="info-label">
                    📍 Venue
                  </span>
                  <strong>{event.venue}</strong>
                </div>

                <div>
                  <span className="info-label">
                    📅 Date
                  </span>
                  <strong>
                    {new Date(
                      event.eventDate
                    ).toLocaleDateString()}
                  </strong>
                </div>
              </div>

              {user?.role !== "admin" && (
                <Link
                  className="event-button"
                  to={`/events/${event._id}`}
                >
                  View Details
                  <span>→</span>
                </Link>
              )}
            </article>
          ))}
        </div>
      )}
    </main>
  );
};

export default Events;