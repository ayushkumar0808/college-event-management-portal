import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import "../styles/auth.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "student",
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
      await api.post("/auth/register", formData);

      setSuccess("Registration successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      {/* LEFT BRAND */}

      <section className="auth-brand">
        <div className="brand-content">
          <div className="brand-logo">CE</div>

          <span className="brand-label">COLLEGE EVENTS</span>

          <h1>
            Your campus.
            <br />
            Your events.
            <br />
            <span>Your community.</span>
          </h1>

          <p>
            Join your college community, discover exciting events, and create
            experiences worth remembering.
          </p>

          <div className="brand-line"></div>

          <small>Built for campus communities.</small>
        </div>
      </section>

      {/* REGISTER SIDE */}

      <section className="auth-form-section">
        <div className="auth-card">
          {/* MOBILE BRAND */}

          <div className="mobile-brand">
            <div className="brand-logo">CE</div>

            <span>COLLEGE EVENTS</span>
          </div>

          {/* HEADING */}

          <div className="auth-heading">
            <span>GET STARTED</span>

            <h2>Create your account</h2>

            <p>Join the college events community today.</p>
          </div>

          {/* ERROR */}

          {error && (
            <div className="auth-error">
              <span>!</span>
              {error}
            </div>
          )}

          {/* SUCCESS */}

          {success && (
            <div className="auth-success">
              <span>✓</span>
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* NAME */}

            <div className="auth-field">
              <label htmlFor="name">Full name</label>

              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="name"
                required
              />
            </div>

            {/* EMAIL */}

            <div className="auth-field">
              <label htmlFor="email">Email address</label>

              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            {/* PASSWORD */}

            <div className="auth-field">
              <label htmlFor="password">Password</label>

              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                autoComplete="new-password"
                required
              />
            </div>

            {/* PHONE */}

            <div className="auth-field">
              <label htmlFor="phone">Phone number</label>

              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                autoComplete="tel"
                required
              />
            </div>

            {/* ROLE */}

            <div className="auth-field">
              <label htmlFor="role">Account type</label>

              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="auth-select"
              >
                <option value="student">Student</option>

                <option value="organizer">Organizer</option>
              </select>
            </div>

            {/* SUBMIT */}

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? (
                <>
                  <span className="auth-spinner"></span>
                  Creating account...
                </>
              ) : (
                <>
                  Create account
                  <span>→</span>
                </>
              )}
            </button>
          </form>

          {/* LOGIN */}

          <div className="register-prompt">
            <p>Already have an account?</p>

            <Link to="/login">
              Sign in
              <span>→</span>
            </Link>
          </div>

          {/* FOOTER */}

          <div className="auth-footer">
            <span>© 2026 College Events</span>
            <span>Secure &amp; Simple</span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Register;





























// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import api from "../services/api";

// const Register = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone: "",
//     role: "student",
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
//       await api.post("/auth/register", formData);

//       setSuccess("Registration successful! Please login.");

//       setTimeout(() => {
//         navigate("/login");
//       }, 1000);
//     } catch (error) {
//       setError(
//         error.response?.data?.message ||
//           "Registration failed. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1>Create Account</h1>

//       {error && <p>{error}</p>}
//       {success && <p>{success}</p>}

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Enter your name"
//             required
//           />
//         </div>

//         <div>
//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Enter your email"
//             required
//           />
//         </div>

//         <div>
//           <label>Password</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Enter password"
//             required
//           />
//         </div>

//         <div>
//           <label>Phone</label>
//           <input
//             type="tel"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             placeholder="Enter phone number"
//             required
//           />
//         </div>

//         <div>
//           <label>Account Type</label>

//           <select
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//           >
//             <option value="student">Student</option>
//             <option value="organizer">Organizer</option>
//           </select>
//         </div>

//         <button type="submit" disabled={loading}>
//           {loading ? "Creating Account..." : "Register"}
//         </button>
//       </form>

//       <p>
//         Already have an account?{" "}
//         <Link to="/login">Login</Link>
//       </p>
//     </div>
//   );
// };

// export default Register;
