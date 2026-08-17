import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../styles/organizerEvents.css";

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

        setError(error.response?.data?.message || "Failed to load your events");
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, []);

  const handleDelete = async (eventId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?",
    );

    if (!confirmed) return;

    try {
      await api.delete(`/events/${eventId}`);

      setEvents((prevEvents) =>
        prevEvents.filter((event) => event._id !== eventId),
      );
    } catch (error) {
      console.error("Delete Event Error:", error);

      alert(error.response?.data?.message || "Failed to delete event");
    }
  };

  if (loading) {
    return (
      <main className="organizer-events-page">
        <div className="events-loading">
          <div className="loading-spinner"></div>
          <p>Loading your events...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="organizer-events-page">
        <div className="events-error">
          <span>!</span>
          <h2>Something went wrong</h2>
          <p>{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="organizer-events-page">
      {/* Header */}

      <section className="events-page-header">
        <div>
          <span className="events-eyebrow">ORGANIZER WORKSPACE</span>

          <h1>My Events</h1>

          <p>
            Manage your events, registrations and participants from one place.
          </p>
        </div>

        <Link to="/organizer/events/create" className="create-event-btn">
          <span>＋</span>
          Create Event
        </Link>
      </section>

      {/* Stats */}

      <section className="events-mini-stats">
        <div className="event-mini-card">
          <div className="mini-icon purple">◈</div>

          <div>
            <span>TOTAL EVENTS</span>
            <strong>{events.length}</strong>
          </div>
        </div>

        <div className="event-mini-card">
          <div className="mini-icon blue">◎</div>

          <div>
            <span>YOUR WORKSPACE</span>
            <strong>Active</strong>
          </div>
        </div>

        <div className="event-mini-card">
          <div className="mini-icon green">✓</div>

          <div>
            <span>MANAGEMENT</span>
            <strong>Ready</strong>
          </div>
        </div>
      </section>

      {/* Event List */}

      {events.length === 0 ? (
        <section className="events-empty">
          <div className="empty-icon">◈</div>

          <h2>No events yet</h2>

          <p>
            You haven't created any events. Start by creating your first college
            event.
          </p>

          <Link to="/organizer/events/create" className="empty-create-btn">
            ＋ Create Your First Event
          </Link>
        </section>
      ) : (
        <section className="events-list-section">
          <div className="events-list-heading">
            <div>
              <span>EVENT LIBRARY</span>
              <h2>Your Events</h2>
            </div>

            <p>
              {events.length} {events.length === 1 ? "event" : "events"}
            </p>
          </div>

          <div className="organizer-event-grid">
            {events.map((event) => (
              <article className="organizer-event-card" key={event._id}>
                {/* Banner */}

                <div className="event-card-banner">
                  {event.banner ? (
                    <img src={event.banner} alt={event.title} />
                  ) : (
                    <div className="event-banner-placeholder">
                      <span>✦</span>
                    </div>
                  )}

                  <span className="event-category">
                    {event.category || "Event"}
                  </span>
                </div>

                {/* Content */}

                <div className="event-card-content">
                  <h3>{event.title}</h3>

                  <p className="event-description">{event.description}</p>

                  <div className="event-meta">
                    <div>
                      <span className="meta-icon">◷</span>

                      <div>
                        <small>DATE</small>
                        <strong>
                          {new Date(event.eventDate).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </strong>
                      </div>
                    </div>

                    <div>
                      <span className="meta-icon">◎</span>

                      <div>
                        <small>VENUE</small>
                        <strong>{event.venue || "Not specified"}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}

                  <div className="event-card-actions">
                    <Link
                      to={`/organizer/events/${event._id}/registrations`}
                      className="registrations-btn"
                    >
                      <span>◎</span>
                      Registrations
                    </Link>

                    <Link
                      to={`/organizer/events/${event._id}/edit`}
                      className="edit-event-btn"
                    >
                      Edit
                    </Link>

                    <button
                      className="delete-event-btn"
                      onClick={() => handleDelete(event._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default OrganizerEvents;
















































// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../services/api";

// const OrganizerEvents = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchMyEvents = async () => {
//       try {
//         const response = await api.get("/events/my");

//         setEvents(response.data.events || []);
//       } catch (error) {
//         console.error("Fetch My Events Error:", error);

//         setError(error.response?.data?.message || "Failed to load your events");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMyEvents();
//   }, []);

//   const handleDelete = async (eventId) => {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this event?",
//     );

//     if (!confirmed) return;

//     try {
//       await api.delete(`/events/${eventId}`);

//       // Remove deleted event from UI
//       setEvents((prevEvents) =>
//         prevEvents.filter((event) => event._id !== eventId),
//       );
//     } catch (error) {
//       console.error("Delete Event Error:", error);

//       alert(error.response?.data?.message || "Failed to delete event");
//     }
//   };

//   if (loading) {
//     return <h2>Loading your events...</h2>;
//   }

//   if (error) {
//     return <h2>{error}</h2>;
//   }

//   return (
//     <div>
//       <h1>My Events</h1>

//       <Link to="/organizer/events/create">
//         <button>Create Event</button>
//       </Link>

//       {events.length === 0 ? (
//         <p>You have not created any events yet.</p>
//       ) : (
//         <div>
//           {events.map((event) => (
//             <div key={event._id}>
//               <h2>{event.title}</h2>

//               <p>{event.description}</p>

//               <p>Category: {event.category}</p>

//               <p>Venue: {event.venue}</p>

//               <p>Date: {new Date(event.eventDate).toLocaleDateString()}</p>
//               <Link to={`/organizer/events/${event._id}/edit`}>
//                 <button>Edit</button>
//               </Link>

//               <button onClick={() => handleDelete(event._id)}>Delete</button>

//               <Link to={`/organizer/events/${event._id}/registrations`}>
//                 <button>View Registrations</button>
//               </Link>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrganizerEvents;
