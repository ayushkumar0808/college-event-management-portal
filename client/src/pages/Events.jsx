import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import "../styles/events.css";

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
      <main className="events-page">
        <div className="events-loading">
          <div className="loading-spinner"></div>
          <p>Loading events...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="events-page">
        <div className="events-error">
          <div className="error-icon">!</div>
          <h2>Something went wrong</h2>
          <p>{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="events-page">

      {/* ================= HEADER ================= */}

      <section className="events-header">

        <div>
          <span className="events-eyebrow">
            CAMPUS EVENTS
          </span>

          <h1>
            Discover what's
            <span> happening.</span>
          </h1>

          <p>
            Explore upcoming events, workshops,
            competitions and activities happening
            across your college.
          </p>
        </div>

        <div className="events-count-card">
          <span>{events.length}</span>
          <small>
            {events.length === 1
              ? "Event Available"
              : "Events Available"}
          </small>
        </div>

      </section>


      {/* ================= EVENTS ================= */}

      {events.length === 0 ? (
        <section className="events-empty">

          <div className="empty-icon">
            ◇
          </div>

          <h2>No events available</h2>

          <p>
            There are currently no published events.
            Check back later for new events.
          </p>

        </section>
      ) : (
        <section className="events-grid">

          {events.map((event) => (

            <article
              className="premium-event-card"
              key={event._id}
            >

              {/* Card Header */}

              <div className="event-card-header">

                <span className="event-category">
                  {event.category}
                </span>

                <span className="event-published">
                  <span></span>
                  Published
                </span>

              </div>


              {/* Title */}

              <h2 className="event-title">
                {event.title}
              </h2>


              {/* Description */}

              <p className="event-description">
                {event.description}
              </p>


              {/* Event Details */}

              <div className="event-details">

                <div className="event-detail">

                  <div className="detail-icon">
                    📅
                  </div>

                  <div>
                    <span>Date</span>

                    <strong>
                      {new Date(
                        event.eventDate
                      ).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </strong>
                  </div>

                </div>


                <div className="event-detail">

                  <div className="detail-icon">
                    📍
                  </div>

                  <div>
                    <span>Venue</span>

                    <strong>
                      {event.venue}
                    </strong>
                  </div>

                </div>

              </div>


              {/* Footer */}

              <div className="event-card-footer">

                {user?.role !== "admin" ? (
                  <Link
                    to={`/events/${event._id}`}
                    className="view-event-btn"
                  >
                    <span>View Details</span>
                    <span className="arrow">
                      →
                    </span>
                  </Link>
                ) : (
                  <span className="admin-event-label">
                    Admin View
                  </span>
                )}

              </div>

            </article>

          ))}

        </section>
      )}

    </main>
  );
};

export default Events;
