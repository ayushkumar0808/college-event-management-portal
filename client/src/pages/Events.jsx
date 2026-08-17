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

        setError(error.response?.data?.message || "Failed to load events");
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
          <div className="loading-orbit">
            <div className="loading-dot"></div>
          </div>

          <h3>Loading events</h3>
          <p>Finding the latest campus events...</p>
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

          <button
            className="retry-btn"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="events-page">
      {/* HERO */}
      <section className="events-hero">
        <div className="hero-glow hero-glow-one"></div>
        <div className="hero-glow hero-glow-two"></div>

        <div className="hero-content">
          <div className="hero-badge">
            <span className="live-dot"></span>
            CAMPUS EVENTS
          </div>

          <h1>
            Discover what's
            <span> happening.</span>
          </h1>

          <p>
            Explore workshops, competitions, seminars and exciting activities
            happening across your college campus.
          </p>

          <div className="hero-stats">
            <div className="hero-stat">
              <strong>{events.length}</strong>
              <span>Upcoming Events</span>
            </div>

            <div className="stat-divider"></div>

            <div className="hero-stat">
              <strong>Campus</strong>
              <span>Experiences</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="floating-card floating-card-top">
            <span>✦</span>
            <div>
              <strong>Discover</strong>
              <small>New experiences</small>
            </div>
          </div>

          <div className="hero-orb">
            <div className="orb-inner">
              <span>CE</span>
            </div>
          </div>

          <div className="floating-card floating-card-bottom">
            <span>✓</span>
            <div>
              <strong>Join Events</strong>
              <small>Make memories</small>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION HEADER */}
      <section className="events-section-header">
        <div>
          <span className="section-label">EXPLORE</span>

          <h2>Upcoming events</h2>

          <p>Find something interesting and be part of the experience.</p>
        </div>

        <div className="events-count-pill">
          <span>{events.length}</span>
          {events.length === 1 ? "Event" : "Events"}
        </div>
      </section>

      {/* EMPTY */}
      {events.length === 0 ? (
        <section className="events-empty">
          <div className="empty-icon">✦</div>

          <h2>No events available</h2>

          <p>
            There are currently no published events. Check back later for
            something exciting.
          </p>
        </section>
      ) : (
        /* EVENTS GRID */
        <section className="events-grid">
          {events.map((event) => (
            <article className="premium-event-card" key={event._id}>
              {/* CARD IMAGE / VISUAL */}
              <div className="event-card-cover">
                {event.banner ? (
                  <img src={event.banner} alt={event.title} />
                ) : (
                  <div className="event-cover-placeholder">
                    <span>
                      {event.category?.charAt(0).toUpperCase() || "E"}
                    </span>
                  </div>
                )}

                <div className="cover-overlay"></div>

                <span className="event-category">{event.category}</span>

                <span className="event-status">
                  <i></i>
                  Published
                </span>
              </div>

              {/* CARD BODY */}
              <div className="event-card-body">
                <h2 className="event-title">{event.title}</h2>

                <p className="event-description">{event.description}</p>

                {/* DETAILS */}
                <div className="event-details">
                  <div className="event-detail">
                    <div className="detail-icon">📅</div>

                    <div>
                      <span>Date</span>

                      <strong>
                        {new Date(event.eventDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </strong>
                    </div>
                  </div>

                  <div className="event-detail">
                    <div className="detail-icon">📍</div>

                    <div>
                      <span>Venue</span>

                      <strong>{event.venue}</strong>
                    </div>
                  </div>
                </div>

                {/* FOOTER */}
                <div className="event-card-footer">
                  {user?.role !== "admin" ? (
                    <Link
                      to={`/events/${event._id}`}
                      className="view-event-btn"
                    >
                      <span>Explore Event</span>

                      <span className="arrow">→</span>
                    </Link>
                  ) : (
                    <div className="admin-event-label">
                      <span>◈</span>
                      Admin View
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
};

export default Events;































// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../services/api";
// import { useAuth } from "../context/AuthContext";

// const Events = () => {
//   const { user } = useAuth();

//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await api.get("/events");

//         setEvents(response.data.events || []);
//       } catch (error) {
//         console.error("Fetch Events Error:", error);

//         setError(
//           error.response?.data?.message ||
//             "Failed to load events"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, []);

//   if (loading) {
//     return <h2>Loading events...</h2>;
//   }

//   if (error) {
//     return <h2>{error}</h2>;
//   }

//   return (
//     <div>
//       <h1>College Events</h1>

//       {events.length === 0 ? (
//         <p>No events available.</p>
//       ) : (
//         <div>
//           {events.map((event) => (
//             <div key={event._id}>
//               <h2>{event.title}</h2>

//               <p>{event.description}</p>

//               <p>Category: {event.category}</p>

//               <p>Venue: {event.venue}</p>

//               <p>
//                 Date:{" "}
//                 {new Date(
//                   event.eventDate
//                 ).toLocaleDateString()}
//               </p>

//               {/* Admin cannot view details */}
//               {user?.role !== "admin" && (
//                 <Link to={`/events/${event._id}`}>
//                   View Details
//                 </Link>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Events;
