import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import "../styles/eventRegistrations.css";

const EventRegistrations = () => {
  const { eventId } = useParams();

  const [event, setEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await api.get(`/events/${eventId}/registrations`);

        setEvent(response.data.event);
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
  }, [eventId]);

  const handleAttendance = async (registrationId, attendance) => {
    try {
      setUpdatingId(registrationId);

      const response = await api.patch(
        `/events/${eventId}/registrations/${registrationId}/attendance`,
        {
          attendance,
        },
      );

      console.log("Attendance Response:", response.data);

      setRegistrations((prevRegistrations) =>
        prevRegistrations.map((registration) =>
          registration._id === registrationId
            ? {
                ...registration,
                attendance,
              }
            : registration,
        ),
      );
    } catch (error) {
      console.error("Mark Attendance Error:", error);

      alert(error.response?.data?.message || "Failed to update attendance");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredRegistrations = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return registrations;
    }

    return registrations.filter((registration) => {
      const name = registration.student?.name?.toLowerCase() || "";

      const email = registration.student?.email?.toLowerCase() || "";

      return name.includes(query) || email.includes(query);
    });
  }, [registrations, search]);

  const presentCount = registrations.filter(
    (registration) => registration.attendance === "present",
  ).length;

  const absentCount = registrations.filter(
    (registration) => registration.attendance === "absent",
  ).length;

  const pendingCount = registrations.length - presentCount - absentCount;

  if (loading) {
    return (
      <main className="event-registrations-page">
        <div className="registrations-loading">
          <div className="registrations-spinner"></div>
          <p>Loading registered students...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="event-registrations-page">
        <div className="registrations-error">
          <div className="registrations-error-icon">!</div>

          <h2>Unable to load registrations</h2>

          <p>{error}</p>

          <Link to="/organizer/events" className="back-organizer-btn">
            Back to My Events
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="event-registrations-page">
      {/* Back */}

      <Link to="/organizer/events" className="registrations-back">
        <span>←</span>
        Back to My Events
      </Link>

      {/* Header */}

      <section className="registrations-page-header">
        <div className="header-main">
          <span className="header-eyebrow">EVENT MANAGEMENT</span>

          <h1>{event?.title || "Event"}</h1>

          <p>Manage registered students and track attendance for this event.</p>
        </div>

        <div className="capacity-badge">
          <span>CAPACITY</span>
          <strong>
            {registrations.length}
            <small>/ {event?.maxParticipants || 0}</small>
          </strong>
        </div>
      </section>

      {/* Stats */}

      <section className="attendance-stats">
        <div className="attendance-stat">
          <div className="stat-symbol total-symbol">◈</div>

          <div>
            <span>Registered</span>
            <strong>{registrations.length}</strong>
          </div>
        </div>

        <div className="attendance-stat">
          <div className="stat-symbol present-symbol">✓</div>

          <div>
            <span>Present</span>
            <strong>{presentCount}</strong>
          </div>
        </div>

        <div className="attendance-stat">
          <div className="stat-symbol absent-symbol">×</div>

          <div>
            <span>Absent</span>
            <strong>{absentCount}</strong>
          </div>
        </div>

        <div className="attendance-stat">
          <div className="stat-symbol pending-symbol">◷</div>

          <div>
            <span>Not Marked</span>
            <strong>{pendingCount}</strong>
          </div>
        </div>
      </section>

      {/* Students Section */}

      <section className="students-section">
        <div className="students-toolbar">
          <div>
            <h2>Registered Students</h2>

            <p>{registrations.length} students registered for this event</p>
          </div>

          <div className="student-search">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search student..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button type="button" onClick={() => setSearch("")}>
                ×
              </button>
            )}
          </div>
        </div>

        {registrations.length === 0 ? (
          <div className="no-students">
            <div className="no-students-icon">◇</div>

            <h2>No registrations yet</h2>

            <p>Students who register for this event will appear here.</p>
          </div>
        ) : filteredRegistrations.length === 0 ? (
          <div className="no-students">
            <div className="no-students-icon">⌕</div>

            <h2>No students found</h2>

            <p>Try searching with a different name or email.</p>
          </div>
        ) : (
          <div className="students-table-wrapper">
            <table className="students-table">
              <thead>
                <tr>
                  <th>STUDENT</th>
                  <th>CONTACT</th>
                  <th>STATUS</th>
                  <th>ATTENDANCE</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                {filteredRegistrations.map((registration) => {
                  const student = registration.student;

                  const isUpdating = updatingId === registration._id;

                  return (
                    <tr key={registration._id}>
                      {/* Student */}

                      <td>
                        <div className="student-info">
                          <div className="student-avatar">
                            {student?.name?.charAt(0)?.toUpperCase() || "S"}
                          </div>

                          <div>
                            <strong>
                              {student?.name || "Unknown Student"}
                            </strong>

                            <span>
                              ID: {registration._id.slice(-8).toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Contact */}

                      <td>
                        <div className="contact-info">
                          <span>{student?.email || "No email"}</span>

                          <small>{student?.phone || "Phone unavailable"}</small>
                        </div>
                      </td>

                      {/* Registration Status */}

                      <td>
                        <span className="registered-status">
                          <span></span>
                          {registration.status}
                        </span>
                      </td>

                      {/* Attendance */}

                      <td>
                        <span
                          className={`attendance-badge ${
                            registration.attendance || "not-marked"
                          }`}
                        >
                          {registration.attendance === "present"
                            ? "Present"
                            : registration.attendance === "absent"
                              ? "Absent"
                              : "Not Marked"}
                        </span>
                      </td>

                      {/* Actions */}

                      <td>
                        <div className="attendance-actions">
                          <button
                            className={`present-btn ${
                              registration.attendance === "present"
                                ? "selected"
                                : ""
                            }`}
                            disabled={isUpdating}
                            onClick={() =>
                              handleAttendance(registration._id, "present")
                            }
                          >
                            ✓ Present
                          </button>

                          <button
                            className={`absent-btn ${
                              registration.attendance === "absent"
                                ? "selected"
                                : ""
                            }`}
                            disabled={isUpdating}
                            onClick={() =>
                              handleAttendance(registration._id, "absent")
                            }
                          >
                            × Absent
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
};

export default EventRegistrations;
