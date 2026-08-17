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