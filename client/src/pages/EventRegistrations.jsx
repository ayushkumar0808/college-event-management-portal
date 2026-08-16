import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const EventRegistrations = () => {
  const { eventId } = useParams();

  const [event, setEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await api.get(
          `/events/${eventId}/registrations`
        );

        setEvent(response.data.event);
        setRegistrations(response.data.registrations || []);
      } catch (error) {
        console.error(
          "Fetch Registrations Error:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Failed to load registrations"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, [eventId]);

  if (loading) {
    return <h2>Loading registrations...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>{event?.title}</h1>

      <p>
        Registered Students: {registrations.length}
      </p>

      <p>
        Maximum Participants: {event?.maxParticipants}
      </p>

      {registrations.length === 0 ? (
        <p>No students have registered yet.</p>
      ) : (
        <div>
          {registrations.map((registration) => (
            <div key={registration._id}>
              <h3>
                {registration.student?.name ||
                  "Unknown Student"}
              </h3>

              <p>
                Email: {registration.student?.email}
              </p>

              <p>
                Phone: {registration.student?.phone || "N/A"}
              </p>

              <p>
                Registered At:{" "}
                {registration.registeredAt
                  ? new Date(
                      registration.registeredAt
                    ).toLocaleString()
                  : "N/A"}
              </p>

              <p>
                Status: {registration.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventRegistrations;