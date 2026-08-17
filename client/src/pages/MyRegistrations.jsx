import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../styles/myRegistrations.css";

const MyRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await api.get("/registrations/my");

        setRegistrations(response.data.registrations || []);
      } catch (error) {
        console.error("Fetch Registrations Error:", error);

        setError(
          error.response?.data?.message || "Failed to load registrations",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  if (loading) {
    return (
      <main className="registrations-page">
        <div className="registrations-loading">
          <div className="registration-spinner"></div>
          <p>Loading your registrations...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="registrations-page">
        <div className="registrations-error">
          <div className="error-icon">!</div>

          <h2>Unable to load registrations</h2>

          <p>{error}</p>

          <Link to="/events" className="browse-events-btn">
            Browse Events
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="registrations-page">
      {/* Header */}

      <section className="registrations-header">
        <div>
          <span className="page-eyebrow">YOUR ACTIVITY</span>

          <h1>My Registrations</h1>

          <p>
            Keep track of the events you have joined and your attendance status.
          </p>
        </div>

        <Link to="/events" className="browse-events-btn header-btn">
          Explore Events
          <span>→</span>
        </Link>
      </section>

      {/* Stats */}

      <section className="registration-stats">
        <div className="stat-card">
          <div className="stat-icon total">◈</div>

          <div>
            <span>Total Registrations</span>
            <strong>{registrations.length}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon registered">✓</div>

          <div>
            <span>Active</span>

            <strong>
              {
                registrations.filter((item) => item.status === "registered")
                  .length
              }
            </strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon attendance">◷</div>

          <div>
            <span>Attendance Marked</span>

            <strong>
              {
                registrations.filter(
                  (item) =>
                    item.attendance === "present" ||
                    item.attendance === "absent",
                ).length
              }
            </strong>
          </div>
        </div>
      </section>

      {/* Registrations */}

      <section className="registrations-section">
        <div className="section-title">
          <div>
            <h2>Your Events</h2>

            <p>Events you have registered for</p>
          </div>

          <span className="registration-count">
            {registrations.length}{" "}
            {registrations.length === 1 ? "Event" : "Events"}
          </span>
        </div>

        {registrations.length === 0 ? (
          <div className="empty-registrations">
            <div className="empty-icon">◇</div>

            <h2>No registrations yet</h2>

            <p>
              You haven't registered for any event. Discover something
              interesting and reserve your spot.
            </p>

            <Link to="/events" className="browse-events-btn">
              Browse Events
              <span>→</span>
            </Link>
          </div>
        ) : (
          <div className="registrations-grid">
            {registrations.map((registration) => {
              const event = registration.event;

              const eventDate = event?.eventDate
                ? new Date(event.eventDate)
                : null;

              const attendance = registration.attendance || "not marked";

              return (
                <article className="registration-card" key={registration._id}>
                  {/* Card Top */}

                  <div className="registration-card-top">
                    <span className="event-category">
                      {event?.category || "College Event"}
                    </span>

                    <span className={`status-badge ${registration.status}`}>
                      <span></span>
                      {registration.status}
                    </span>
                  </div>

                  {/* Event */}

                  <div className="registration-event">
                    <h2>{event?.title || "Event"}</h2>

                    <div className="event-meta">
                      <span>
                        <b>◷</b>

                        {eventDate
                          ? eventDate.toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : "Date unavailable"}
                      </span>

                      <span>
                        <b>⌖</b>

                        {event?.venue || "Venue unavailable"}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}

                  <div className="registration-divider" />

                  {/* Bottom */}

                  <div className="registration-card-bottom">
                    <div className="attendance-info">
                      <span>ATTENDANCE</span>

                      <strong className={`attendance-${attendance}`}>
                        {attendance === "present"
                          ? "Present"
                          : attendance === "absent"
                            ? "Absent"
                            : "Not Marked"}
                      </strong>
                    </div>

                    {event?._id && (
                      <Link
                        to={`/events/${event._id}`}
                        className="view-event-btn"
                      >
                        View Event
                        <span>→</span>
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
};

export default MyRegistrations;
