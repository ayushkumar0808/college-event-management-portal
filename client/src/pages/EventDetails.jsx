import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import "../styles/eventDetails.css";

const EventDetails = () => {
  const { eventId } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/events/${eventId}`);
        setEvent(response.data.event);
      } catch (error) {
        console.error("Fetch Event Error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load event"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleRegister = async () => {
    try {
      setRegistering(true);
      setMessage("");
      setError("");

      const response = await api.post(
        `/events/${eventId}/register`
      );

      setMessage(
        response.data.message ||
          "Successfully registered for event!"
      );
    } catch (error) {
      console.error("Registration Error:", error);

      setError(
        error.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setRegistering(false);
    }
  };

  if (loading) {
    return (
      <main className="event-details-page">
        <div className="details-loading">
          <div className="details-spinner"></div>
          <p>Loading event...</p>
        </div>
      </main>
    );
  }

  if (error && !event) {
    return (
      <main className="event-details-page">
        <div className="details-error">
          <div className="details-error-icon">!</div>
          <h2>Unable to load event</h2>
          <p>{error}</p>

          <Link to="/events" className="back-events-btn">
            Back to Events
          </Link>
        </div>
      </main>
    );
  }

  if (!event) {
    return (
      <main className="event-details-page">
        <div className="details-error">
          <h2>Event not found</h2>

          <Link to="/events" className="back-events-btn">
            Back to Events
          </Link>
        </div>
      </main>
    );
  }

  const eventDate = new Date(event.eventDate);

  const formattedDate = eventDate.toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const formattedTime = eventDate.toLocaleTimeString(
    "en-IN",
    {
      hour: "numeric",
      minute: "2-digit",
    }
  );

  return (
    <main className="event-details-page">

      {/* Back */}
      <Link to="/events" className="details-back">
        <span>←</span>
        Back to Events
      </Link>

      {/* Hero */}
      <section className="event-hero">

        <div className="hero-content">

          <div className="hero-top">
            <span className="hero-category">
              {event.category}
            </span>

            <span className="hero-status">
              <span></span>
              Published
            </span>
          </div>

          <h1>{event.title}</h1>

          <p className="hero-description">
            {event.description}
          </p>

        </div>

        <div className="hero-decoration">
          <div className="decoration-circle circle-one"></div>
          <div className="decoration-circle circle-two"></div>
          <div className="decoration-grid"></div>
        </div>

      </section>


      {/* Main Content */}
      <section className="event-content">

        {/* Left */}
        <div className="event-main">

          <div className="details-section">

            <div className="section-heading">
              <span className="heading-line"></span>

              <h2>About this event</h2>
            </div>

            <p className="full-description">
              {event.description}
            </p>

          </div>


          {/* Event Information */}

          <div className="details-section">

            <div className="section-heading">
              <span className="heading-line"></span>

              <h2>Event Information</h2>
            </div>

            <div className="information-grid">

              <div className="information-item">
                <div className="information-icon date-icon">
                  <span>◷</span>
                </div>

                <div>
                  <small>Date</small>

                  <strong>
                    {formattedDate}
                  </strong>

                  <span>
                    {formattedTime}
                  </span>
                </div>
              </div>


              <div className="information-item">
                <div className="information-icon venue-icon">
                  <span>⌖</span>
                </div>

                <div>
                  <small>Venue</small>

                  <strong>
                    {event.venue}
                  </strong>
                </div>
              </div>


              <div className="information-item">
                <div className="information-icon participant-icon">
                  <span>♙</span>
                </div>

                <div>
                  <small>Capacity</small>

                  <strong>
                    {event.maxParticipants} Participants
                  </strong>
                </div>
              </div>


              <div className="information-item">
                <div className="information-icon category-icon">
                  <span>◆</span>
                </div>

                <div>
                  <small>Category</small>

                  <strong>
                    {event.category}
                  </strong>
                </div>
              </div>

            </div>

          </div>

        </div>


        {/* Right Registration Card */}

        <aside className="registration-card">

          <div className="registration-top">
            <span className="registration-label">
              EVENT REGISTRATION
            </span>

            <div className="registration-icon">
              →
            </div>
          </div>


          <h2>
            Ready to join?
          </h2>

          <p>
            Secure your spot and be part of
            this exciting college event.
          </p>


          <div className="registration-deadline">
            <span className="deadline-icon">
              ⏱
            </span>

            <div>
              <small>
                Registration deadline
              </small>

              <strong>
                {event.registrationDeadline
                  ? new Date(
                      event.registrationDeadline
                    ).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )
                  : "Not specified"}
              </strong>
            </div>
          </div>


          {message && (
            <div className="success-message">
              <span>✓</span>
              {message}
            </div>
          )}


          {error && (
            <div className="registration-error">
              <span>!</span>
              {error}
            </div>
          )}


          <button
            className="register-button"
            onClick={handleRegister}
            disabled={registering || !!message}
          >
            {registering ? (
              <>
                <span className="button-spinner"></span>
                Registering...
              </>
            ) : message ? (
              <>
                <span>✓</span>
                Registered
              </>
            ) : (
              <>
                Register for Event
                <span>→</span>
              </>
            )}
          </button>


          <p className="registration-note">
            Registration is subject to available
            seats.
          </p>

        </aside>

      </section>

    </main>
  );
};

export default EventDetails;