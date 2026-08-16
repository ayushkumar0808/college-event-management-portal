import { useEffect, useState } from "react";
import api from "../services/api";

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
          error.response?.data?.message ||
            "Failed to load registrations"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  if (loading) {
    return <h2>Loading registrations...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>My Registrations</h1>

      {registrations.length === 0 ? (
        <p>You have not registered for any events yet.</p>
      ) : (
        <div>
          {registrations.map((registration) => (
            <div key={registration._id}>
              <h2>
                {registration.event?.title ||
                  "Event"}
              </h2>

              <p>
                Status: {registration.status}
              </p>

              <p>
                Attendance:{" "}
                {registration.attendance || "Not marked"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRegistrations;