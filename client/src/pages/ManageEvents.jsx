import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../styles/manage-events.css";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalEvents: 0,
  });

  const fetchEvents = async (page = 1) => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      if (search.trim()) {
        params.append("search", search.trim());
      }

      if (category) {
        params.append("category", category);
      }

      if (status) {
        params.append("status", status);
      }

      params.append("page", page);
      params.append("limit", 10);

      const response = await api.get(
        `/events/admin?${params.toString()}`
      );

      setEvents(response.data.events || []);
      setPagination(
        response.data.pagination || {
          currentPage: 1,
          totalPages: 1,
          totalEvents: 0,
        }
      );
    } catch (error) {
      console.error("Fetch Admin Events Error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load events"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(1);
  }, [search, category, status]);

  const handleDelete = async (eventId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/events/${eventId}`);

      setEvents((prevEvents) =>
        prevEvents.filter(
          (event) => event._id !== eventId
        )
      );

      setPagination((prev) => ({
        ...prev,
        totalEvents: Math.max(
          prev.totalEvents - 1,
          0
        ),
      }));
    } catch (error) {
      console.error("Delete Event Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete event"
      );
    }
  };

  const getStatusClass = (eventStatus) => {
    switch (eventStatus) {
      case "published":
        return "status-published";

      case "draft":
        return "status-draft";

      case "cancelled":
        return "status-cancelled";

      default:
        return "status-default";
    }
  };

  if (loading && events.length === 0) {
    return (
      <div className="manage-events-page">
        <div className="events-loading">
          <div className="loading-spinner"></div>
          <p>Loading events...</p>
        </div>
      </div>
    );
  }

  if (error && events.length === 0) {
    return (
      <div className="manage-events-page">
        <div className="events-error">
          <h2>Something went wrong</h2>
          <p>{error}</p>

          <button
            onClick={() => fetchEvents(1)}
            className="retry-button"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="manage-events-page">

      {/* Header */}
      <div className="manage-events-header">
        <div>
          <span className="page-eyebrow">
            ADMINISTRATION
          </span>

          <h1>Manage Events</h1>

          <p>
            Monitor, manage and control all college
            events from one place.
          </p>
        </div>

        <div className="events-total">
          <span>Total Events</span>
          <strong>{pagination.totalEvents}</strong>
        </div>
      </div>

      {/* Filters */}
      <div className="event-filters">

        <div className="search-wrapper">
          <span className="search-icon">⌕</span>

          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option value="">All Categories</option>
          <option value="technical">Technical</option>
          <option value="cultural">Cultural</option>
          <option value="sports">Sports</option>
          <option value="workshop">Workshop</option>
          <option value="seminar">Seminar</option>
          <option value="other">Other</option>
        </select>

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >
          <option value="">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="cancelled">Cancelled</option>
        </select>

      </div>

      {/* Events */}
      {events.length === 0 ? (
        <div className="empty-events">
          <div className="empty-icon">◈</div>

          <h2>No events found</h2>

          <p>
            Try changing your search or filters.
          </p>
        </div>
      ) : (
        <div className="events-table-wrapper">

          <table className="events-table">

            <thead>
              <tr>
                <th>EVENT</th>
                <th>ORGANIZER</th>
                <th>CATEGORY</th>
                <th>DATE</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>

              {events.map((event) => (

                <tr key={event._id}>

                  {/* Event */}
                  <td>
                    <div className="event-info">

                      {event.banner ? (
                        <img
                          src={event.banner}
                          alt={event.title}
                          className="event-thumbnail"
                        />
                      ) : (
                        <div className="event-thumbnail-placeholder">
                          ◈
                        </div>
                      )}

                      <div>
                        <h3>{event.title}</h3>

                        <p>
                          {event.venue ||
                            "Venue not specified"}
                        </p>
                      </div>

                    </div>
                  </td>

                  {/* Organizer */}
                  <td>
                    <div className="organizer-info">

                      <div className="organizer-avatar">
                        {event.organizer?.name
                          ?.charAt(0)
                          .toUpperCase() || "O"}
                      </div>

                      <div>
                        <strong>
                          {event.organizer?.name ||
                            "Unknown"}
                        </strong>

                        <span>
                          {event.organizer?.email ||
                            "No email"}
                        </span>
                      </div>

                    </div>
                  </td>

                  {/* Category */}
                  <td>
                    <span className="category-badge">
                      {event.category ||
                        "General"}
                    </span>
                  </td>

                  {/* Date */}
                  <td>
                    <div className="date-info">
                      <strong>
                        {new Date(
                          event.eventDate
                        ).toLocaleDateString()}
                      </strong>

                      <span>
                        {new Date(
                          event.eventDate
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td>
                    <span
                      className={`event-status ${getStatusClass(
                        event.status
                      )}`}
                    >
                      <span className="status-dot"></span>

                      {event.status || "Unknown"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td>

                    <div className="event-actions">

                      <Link
                        to={`/events/${event._id}`}
                        className="action-button view"
                        title="View Event"
                      >
                        👁
                      </Link>

                      <Link
                        to={`/organizer/events/${event._id}/edit`}
                        className="action-button edit"
                        title="Edit Event"
                      >
                        ✎
                      </Link>

                      <button
                        className="action-button delete"
                        title="Delete Event"
                        onClick={() =>
                          handleDelete(event._id)
                        }
                      >
                        🗑
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="pagination">

          <button
            disabled={
              pagination.currentPage === 1
            }
            onClick={() =>
              fetchEvents(
                pagination.currentPage - 1
              )
            }
          >
            ← Previous
          </button>

          <span>
            Page{" "}
            <strong>
              {pagination.currentPage}
            </strong>{" "}
            of{" "}
            <strong>
              {pagination.totalPages}
            </strong>
          </span>

          <button
            disabled={
              pagination.currentPage ===
              pagination.totalPages
            }
            onClick={() =>
              fetchEvents(
                pagination.currentPage + 1
              )
            }
          >
            Next →
          </button>

        </div>
      )}

    </div>
  );
};

export default ManageEvents;