import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/createEvent.css";

const CreateEvent = () => {
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

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await api.post("/events", {
        ...formData,
        maxParticipants: Number(formData.maxParticipants),
      });

      setSuccess(response.data.message || "Event created successfully");

      setTimeout(() => {
        navigate("/organizer/events");
      }, 1000);
    } catch (error) {
      console.error("Create Event Error:", error);

      setError(error.response?.data?.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="create-event-page">
      {/* Header */}

      <section className="create-event-header">
        <div>
          <span className="create-event-eyebrow">ORGANIZER WORKSPACE</span>

          <h1>Create New Event</h1>

          <p>
            Bring your next college event to life. Fill in the details below to
            get started.
          </p>
        </div>

        <button
          type="button"
          className="back-events-btn"
          onClick={() => navigate("/organizer/events")}
        >
          ← Back to Events
        </button>
      </section>

      {/* Form */}

      <section className="create-event-layout">
        <form className="create-event-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <div className="form-section-heading">
              <div className="form-section-number">01</div>

              <div>
                <h2>Event Information</h2>
                <p>Tell students about your event.</p>
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
                placeholder="e.g. Annual Tech Fest 2026"
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

          <div className="form-section">
            <div className="form-section-heading">
              <div className="form-section-number">02</div>

              <div>
                <h2>Schedule & Capacity</h2>
                <p>Set when the event happens and registration closes.</p>
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
                placeholder="e.g. 100"
                min="1"
                required
              />

              <small>
                Set the maximum number of students who can register.
              </small>
            </div>
          </div>

          <div className="form-section">
            <div className="form-section-heading">
              <div className="form-section-number">03</div>

              <div>
                <h2>Event Banner</h2>
                <p>Add an optional image for your event.</p>
              </div>
            </div>

            <div className="form-group full">
              <label>Banner URL</label>

              <input
                type="url"
                name="banner"
                value={formData.banner}
                onChange={handleChange}
                placeholder="https://example.com/event-banner.jpg"
              />

              <small>Leave empty if you don't want to add a banner.</small>
            </div>
          </div>

          {/* Messages */}

          {error && (
            <div className="create-event-message error">
              <span>!</span>
              {error}
            </div>
          )}

          {success && (
            <div className="create-event-message success">
              <span>✓</span>
              {success}
            </div>
          )}

          {/* Submit */}

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
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="button-spinner"></span>
                  Creating...
                </>
              ) : (
                <>
                  Create Event
                  <span>→</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Side Card */}

        <aside className="create-event-sidebar">
          <div className="sidebar-preview">
            <span className="preview-label">EVENT CREATION</span>

            <div className="preview-icon">✦</div>

            <h3>Make it memorable.</h3>

            <p>
              Give students all the information they need to discover and join
              your event.
            </p>
          </div>

          <div className="creation-tips">
            <span>QUICK TIPS</span>

            <div>
              <b>01</b>
              <p>Use a clear and attractive event title.</p>
            </div>

            <div>
              <b>02</b>
              <p>Provide accurate date and venue details.</p>
            </div>

            <div>
              <b>03</b>
              <p>Set a realistic participant capacity.</p>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
};

export default CreateEvent;













































// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";

// const CreateEvent = () => {
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

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError("");
//     setSuccess("");
//     setLoading(true);

//     try {
//       const response = await api.post("/events", {
//         ...formData,
//         maxParticipants: Number(formData.maxParticipants),
//       });

//       setSuccess(
//         response.data.message || "Event created successfully"
//       );

//       setTimeout(() => {
//         navigate("/organizer/events");
//       }, 1000);
//     } catch (error) {
//       console.error("Create Event Error:", error);

//       setError(
//         error.response?.data?.message ||
//           "Failed to create event"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1>Create Event</h1>

//       {error && <p>{error}</p>}
//       {success && <p>{success}</p>}

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
//             placeholder="Optional"
//           />
//         </div>

//         <button type="submit" disabled={loading}>
//           {loading ? "Creating..." : "Create Event"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateEvent;
