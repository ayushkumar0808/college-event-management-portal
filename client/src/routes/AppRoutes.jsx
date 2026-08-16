import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminDashboard from "../pages/AdminDashboard";
import OrganizerDashboard from "../pages/OrganizerDashboard";
import Events from "../pages/Events";
import Unauthorized from "../pages/Unauthorized";
import EventDetails from "../pages/EventDetails";
import MyRegistrations from "../pages/MyRegistrations";
import OrganizerEvents from "../pages/OrganizerEvents";
import CreateEvent from "../pages/CreateEvent";
import EditEvent from "../pages/EditEvent";

import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/organizer"
        element={
          <ProtectedRoute allowedRoles={["organizer"]}>
            <OrganizerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/events"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <Events />
          </ProtectedRoute>
        }
      />

      <Route
        path="/unauthorized"
        element={<Unauthorized />}
      />

      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      <Route
  path="/events/:eventId"
  element={
    <ProtectedRoute allowedRoles={["student"]}>
      <EventDetails />
    </ProtectedRoute>
  }
/>

<Route
  path="/my-registrations"
  element={
    <ProtectedRoute allowedRoles={["student"]}>
      <MyRegistrations />
    </ProtectedRoute>
  }
/>
<Route
  path="/organizer/events"
  element={
    <ProtectedRoute allowedRoles={["organizer", "admin"]}>
      <OrganizerEvents />
    </ProtectedRoute>
  }
/>

<Route
  path="/organizer/events/create"
  element={
    <ProtectedRoute allowedRoles={["organizer", "admin"]}>
      <CreateEvent />
    </ProtectedRoute>
  }
/>

<Route
  path="/organizer/events/:eventId/edit"
  element={
    <ProtectedRoute allowedRoles={["organizer", "admin"]}>
      <EditEvent />
    </ProtectedRoute>
  }
/>

    </Routes>
  );
};

export default AppRoutes;