import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/organizerDashboard.css";

const OrganizerDashboard = () => {
  const { user } = useAuth();

  const firstName = user?.name?.split(" ")[0] || "Organizer";

  return (
    <main className="organizer-dashboard">
      {/* Hero */}

      <section className="organizer-hero">
        <div className="organizer-hero-content">
          <span className="organizer-eyebrow">ORGANIZER PORTAL</span>

          <h1>
            Welcome back,
            <br />
            <span>{firstName}</span> 👋
          </h1>

          <p>
            Create memorable events, manage registrations, and keep track of
            your participants from one place.
          </p>

          <div className="organizer-hero-actions">
            <Link
              to="/organizer/events/create"
              className="primary-organizer-btn"
            >
              <span>＋</span>
              Create New Event
            </Link>

            <Link to="/organizer/events" className="secondary-organizer-btn">
              View My Events
              <span>→</span>
            </Link>
          </div>
        </div>

        <div className="organizer-hero-visual">
          <div className="hero-orbit orbit-one"></div>
          <div className="hero-orbit orbit-two"></div>

          <div className="organizer-glass-card">
            <div className="glass-card-icon">✦</div>

            <div>
              <span>EVENT MANAGEMENT</span>
              <strong>Organizer Hub</strong>
            </div>
          </div>

          <div className="floating-card floating-card-one">
            <span>✓</span>
            <div>
              <strong>Attendance</strong>
              <small>Track participants</small>
            </div>
          </div>

          <div className="floating-card floating-card-two">
            <span>◈</span>
            <div>
              <strong>Events</strong>
              <small>Manage everything</small>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Overview */}

      <section className="organizer-overview">
        <div className="overview-card">
          <div className="overview-icon purple">◈</div>

          <div>
            <span>EVENTS</span>
            <strong>Manage</strong>
            <small>Your events</small>
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-icon blue">＋</div>

          <div>
            <span>CREATE</span>
            <strong>New Event</strong>
            <small>Start something new</small>
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-icon green">✓</div>

          <div>
            <span>ATTENDANCE</span>
            <strong>Track</strong>
            <small>Student attendance</small>
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-icon orange">◎</div>

          <div>
            <span>ACCOUNT</span>
            <strong>Organizer</strong>
            <small>{user?.email || "Account"}</small>
          </div>
        </div>
      </section>

      {/* Quick Actions */}

      <section className="organizer-actions-section">
        <div className="organizer-section-heading">
          <div>
            <span>WORKSPACE</span>
            <h2>Quick Actions</h2>
          </div>

          <p>Everything you need to manage your events.</p>
        </div>

        <div className="organizer-action-grid">
          <Link to="/organizer/events" className="organizer-action-card">
            <div className="action-card-top">
              <div className="action-icon purple">◈</div>

              <span>01</span>
            </div>

            <h3>My Events</h3>

            <p>View, edit, manage and monitor all events created by you.</p>

            <div className="action-link">
              Manage Events
              <span>→</span>
            </div>
          </Link>

          <Link
            to="/organizer/events/create"
            className="organizer-action-card featured"
          >
            <div className="action-card-top">
              <div className="action-icon blue">＋</div>

              <span>02</span>
            </div>

            <h3>Create Event</h3>

            <p>
              Create a new college event with details, venue, schedule and
              capacity.
            </p>

            <div className="action-link">
              Create Event
              <span>→</span>
            </div>
          </Link>

          <Link to="/organizer/events" className="organizer-action-card">
            <div className="action-card-top">
              <div className="action-icon green">✓</div>

              <span>03</span>
            </div>

            <h3>Registrations</h3>

            <p>
              Open your events and manage registered students and attendance.
            </p>

            <div className="action-link">
              View Registrations
              <span>→</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Account */}

      <section className="organizer-account">
        <div className="account-avatar">
          {user?.name?.charAt(0)?.toUpperCase() || "O"}
        </div>

        <div className="account-details">
          <span>LOGGED IN AS</span>

          <h3>{user?.name || "Organizer"}</h3>

          <p>{user?.email}</p>
        </div>

        <div className="account-role">
          <span>ROLE</span>
          <strong>Organizer</strong>
        </div>
      </section>
    </main>
  );
};

export default OrganizerDashboard;





































// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const OrganizerDashboard = () => {
//   const { user } = useAuth();

//   return (
//     <div>
//       <h1>Organizer Dashboard</h1>

//       <p>Welcome, {user?.name}</p>

//       <div>
//         <Link to="/organizer/events">
//           <button>My Events</button>
//         </Link>

//         <Link to="/organizer/events/create">
//           <button>Create Event</button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default OrganizerDashboard;
