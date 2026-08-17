import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/auth.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
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
    setLoading(true);

    try {
      const response = await login(formData.email, formData.password);

      const role = response.user.role;

      if (role === "admin") {
        navigate("/admin");
      } else if (role === "organizer") {
        navigate("/organizer");
      } else {
        navigate("/events");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      {/* Left Side */}

      <section className="auth-brand">
        <div className="brand-content">
          <div className="brand-logo">CE</div>

          <span className="brand-label">COLLEGE EVENTS</span>

          <h1>
            Discover.
            <br />
            Connect.
            <br />
            <span>Experience.</span>
          </h1>

          <p>
            One platform to discover college events, connect with your
            community, and never miss what matters.
          </p>

          <div className="brand-line"></div>

          <small>Built for campus communities.</small>
        </div>
      </section>

      {/* Login Side */}

      <section className="auth-form-section">
        <div className="auth-card">
          <div className="mobile-brand">
            <div className="brand-logo">CE</div>

            <span>COLLEGE EVENTS</span>
          </div>

          <div className="auth-heading">
            <span>WELCOME BACK</span>

            <h2>Sign in to your account</h2>

            <p>Enter your details to continue.</p>
          </div>

          {error && (
            <div className="auth-error">
              <span>!</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="email">Email address</label>

              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ayush@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="auth-field">
              <div className="password-label">
                <label htmlFor="password">Password</label>
              </div>

              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? (
                <>
                  <span className="auth-spinner"></span>
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <span>→</span>
                </>
              )}
            </button>
          </form>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <div className="register-prompt">
            <p>Don't have an account?</p>

            <Link to="/register">
              Create an account
              <span>→</span>
            </Link>
          </div>

          <div className="auth-footer">
            <span>© 2026 College Events</span>
            <span>Secure &amp; Simple</span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;

























// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const Login = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState("");
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
//     setLoading(true);

//     try {
//       const response = await login(
//         formData.email,
//         formData.password
//       );

//       const role = response.user.role;

//       if (role === "admin") {
//         navigate("/admin");
//       } else if (role === "organizer") {
//         navigate("/organizer");
//       } else {
//         navigate("/events");
//       }
//     } catch (error) {
//       setError(
//         error.response?.data?.message ||
//           "Login failed. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>

//       {error && <p>{error}</p>}

//       <form onSubmit={handleSubmit}>
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
//             placeholder="Enter your password"
//             required
//           />
//         </div>

//         <button type="submit" disabled={loading}>
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;
