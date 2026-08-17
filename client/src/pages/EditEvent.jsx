import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "../styles/createEvent.css";

const EditEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    venue: "",
    eventDate: "",
    registrationDeadline: "",
    maxParticipants: "",
    banner: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/events/${eventId}`);

        const event = response.data.event;

        setFormData({
          title: event.title || "",
          description: event.description || "",
          category: event.category || "",
          venue: event.venue || "",
          eventDate: event.eventDate
            ? new Date(event.eventDate).toISOString().slice(0, 16)
            : "",
          registrationDeadline: event.registrationDeadline
            ? new Date(event.registrationDeadline).toISOString().slice(0, 16)
            : "",
          maxParticipants: event.maxParticipants || "",
          banner: event.banner || "",
        });
      } catch (error) {
        console.error("Fetch Event Error:", error);

        setError(error.response?.data?.message || "Failed to load event");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSaving(true);

    try {
      await api.put(`/events/${eventId}`, {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        venue: formData.venue,
        eventDate: new Date(formData.eventDate).toISOString(),
        registrationDeadline: new Date(
          formData.registrationDeadline,
        ).toISOString(),
        maxParticipants: Number(formData.maxParticipants),
        banner: formData.banner,
      });

      navigate("/organizer/events");
    } catch (error) {
      console.error("Update Event Error:", error);

      setError(error.response?.data?.message || "Failed to update event");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="create-event-page">
        <div className="event-loading-card">
          <div className="page-spinner"></div>
          <h2>Loading event...</h2>
          <p>Preparing your event details.</p>
        </div>
      </main>
    );
  }

  if (error && !formData.title) {
    return (
      <main className="create-event-page">
        <div className="event-error-card">
          <div className="error-icon">!</div>

          <h2>Unable to load event</h2>

          <p>{error}</p>

          <button onClick={() => navigate("/organizer/events")}>
            ← Back to My Events
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="create-event-page">
      {/* Header */}

      <section className="create-event-header">
        <div>
          <span className="create-event-eyebrow">ORGANIZER WORKSPACE</span>

          <h1>Edit Event</h1>

          <p>Update your event information and keep everything up to date.</p>
        </div>

        <button
          type="button"
          className="back-events-btn"
          onClick={() => navigate("/organizer/events")}
        >
          ← Back to Events
        </button>
      </section>

      {/* Main Layout */}

      <section className="create-event-layout">
        <form className="create-event-form" onSubmit={handleSubmit}>
          {/* SECTION 01 */}

          <div className="form-section">
            <div className="form-section-heading">
              <div className="form-section-number">01</div>

              <div>
                <h2>Event Information</h2>
                <p>Update the basic information of your event.</p>
              </div>
            </div>

            <div className="form-group full">
              <label>
                Event Title
                <span>*</span>
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Event title"
                required
              />
            </div>

            <div className="form-group full">
              <label>
                Description
                <span>*</span>
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your event..."
                rows="5"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>
                  Category
                  <span>*</span>
                </label>

                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g. Technical"
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  Venue
                  <span>*</span>
                </label>

                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  placeholder="e.g. Main Auditorium"
                  required
                />
              </div>
            </div>
          </div>

          {/* SECTION 02 */}

          <div className="form-section">
            <div className="form-section-heading">
              <div className="form-section-number">02</div>

              <div>
                <h2>Schedule & Capacity</h2>
                <p>Update timing and participant limits.</p>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>
                  Event Date
                  <span>*</span>
                </label>

                <input
                  type="datetime-local"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  Registration Deadline
                  <span>*</span>
                </label>

                <input
                  type="datetime-local"
                  name="registrationDeadline"
                  value={formData.registrationDeadline}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>
                Maximum Participants
                <span>*</span>
              </label>

              <input
                type="number"
                name="maxParticipants"
                value={formData.maxParticipants}
                onChange={handleChange}
                min="1"
                placeholder="e.g. 100"
                required
              />

              <small>Maximum number of students who can register.</small>
            </div>
          </div>

          {/* SECTION 03 */}

          <div className="form-section">
            <div className="form-section-heading">
              <div className="form-section-number">03</div>

              <div>
                <h2>Event Banner</h2>
                <p>Update the visual banner of your event.</p>
              </div>
            </div>

            <div className="form-group full">
              <label>Banner URL</label>

              <input
                type="url"
                name="banner"
                value={formData.banner}
                onChange={handleChange}
                placeholder="https://example.com/banner.jpg"
              />

              <small>Leave empty if you don't want a banner.</small>
            </div>
          </div>

          {/* ERROR */}

          {error && (
            <div className="create-event-message error">
              <span>!</span>
              {error}
            </div>
          )}

          {/* ACTIONS */}

          <div className="create-event-submit">
            <button
              type="button"
              className="cancel-event-btn"
              onClick={() => navigate("/organizer/events")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submit-event-btn"
              disabled={saving}
            >
              {saving ? (
                <>
                  <span className="button-spinner"></span>
                  Updating...
                </>
              ) : (
                <>
                  Save Changes
                  <span>✓</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* SIDEBAR */}

        <aside className="create-event-sidebar">
          <div className="sidebar-preview">
            <span className="preview-label">EDITING EVENT</span>

            <div className="preview-icon">✦</div>

            <h3>Keep it updated.</h3>

            <p>
              Make sure your event information is accurate before students
              register.
            </p>
          </div>

          <div className="creation-tips">
            <span>BEFORE SAVING</span>

            <div>
              <b>01</b>
              <p>Check the event date and registration deadline.</p>
            </div>

            <div>
              <b>02</b>
              <p>Make sure the venue information is correct.</p>
            </div>

            <div>
              <b>03</b>
              <p>Review participant capacity.</p>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
};

export default EditEvent;





























// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import api from "../services/api";

// const EditEvent = () => {
//   const { eventId } = useParams();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     category: "",
//     venue: "",
//     eventDate: "",
//     registrationDeadline: "",
//     maxParticipants: "",
//     banner: "",
//   });

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");

//   // Fetch existing event
//   useEffect(() => {
//     const fetchEvent = async () => {
//       try {
//         const response = await api.get(`/events/${eventId}`);

//         const event = response.data.event;

//         setFormData({
//           title: event.title || "",
//           description: event.description || "",
//           category: event.category || "",
//           venue: event.venue || "",
//           eventDate: event.eventDate
//             ? new Date(event.eventDate)
//                 .toISOString()
//                 .slice(0, 16)
//             : "",
//           registrationDeadline: event.registrationDeadline
//             ? new Date(event.registrationDeadline)
//                 .toISOString()
//                 .slice(0, 16)
//             : "",
//           maxParticipants: event.maxParticipants || "",
//           banner: event.banner || "",
//         });
//       } catch (error) {
//         console.error("Fetch Event Error:", error);

//         setError(
//           error.response?.data?.message ||
//             "Failed to load event"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvent();
//   }, [eventId]);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   setError("");
//   setSaving(true);

//   try {
//     const response = await api.put(`/events/${eventId}`, {
//       title: formData.title,
//       description: formData.description,
//       category: formData.category,
//       venue: formData.venue,
//  eventDate: new Date(formData.eventDate).toISOString(),
// registrationDeadline: new Date(
//   formData.registrationDeadline
// ).toISOString(),
//       maxParticipants: Number(formData.maxParticipants),
//       banner: formData.banner,
//     });

//     console.log("Update Response:", response.data);

//     navigate("/organizer/events");
//   } catch (error) {
//     console.error("Update Event Error:", error);
//     console.error("Server Response:", error.response?.data);

//     setError(
//       error.response?.data?.message ||
//         "Failed to update event"
//     );
//   } finally {
//     setSaving(false);
//   }
// };

//   if (loading) {
//     return <h2>Loading event...</h2>;
//   }

//   if (error && !formData.title) {
//     return <h2>{error}</h2>;
//   }

//   return (
//     <div>
//       <h1>Edit Event</h1>

//       {error && <p>{error}</p>}

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Title</label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Description</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Category</label>
//           <input
//             type="text"
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Venue</label>
//           <input
//             type="text"
//             name="venue"
//             value={formData.venue}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Registration Deadline</label>
//           <input
//             type="datetime-local"
//             name="registrationDeadline"
//             value={formData.registrationDeadline}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Event Date</label>
//           <input
//             type="datetime-local"
//             name="eventDate"
//             value={formData.eventDate}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Maximum Participants</label>
//           <input
//             type="number"
//             name="maxParticipants"
//             value={formData.maxParticipants}
//             onChange={handleChange}
//             min="1"
//             required
//           />
//         </div>

//         <div>
//           <label>Banner URL</label>
//           <input
//             type="text"
//             name="banner"
//             value={formData.banner}
//             onChange={handleChange}
//           />
//         </div>

//         <button type="submit" disabled={saving}>
//           {saving ? "Updating..." : "Update Event"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditEvent;
