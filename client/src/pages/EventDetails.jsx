import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

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
    return <h2>Loading event...</h2>;
  }

  if (error && !event) {
    return <h2>{error}</h2>;
  }

  if (!event) {
    return <h2>Event not found</h2>;
  }

  return (
    <div>
      <h1>{event.title}</h1>

      <p>{event.description}</p>

      <p>
        <strong>Category:</strong> {event.category}
      </p>

      <p>
        <strong>Venue:</strong> {event.venue}
      </p>

      <p>
        <strong>Date:</strong>{" "}
        {new Date(event.eventDate).toLocaleDateString()}
      </p>

      <p>
        <strong>Maximum Participants:</strong>{" "}
        {event.maxParticipants}
      </p>

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}

      <button
        onClick={handleRegister}
        disabled={registering}
      >
        {registering
          ? "Registering..."
          : "Register for Event"}
      </button>
    </div>
  );
};

export default EventDetails;