import React, { useState } from "react";

/**
 * PUBLIC_INTERFACE
 * Login - A controlled React functional component for user login.
 *
 * Renders a form with labelled email and password fields.
 * All fields are accessible and styled with classNames suitable for theming.
 * On submit, the entered values are logged to the console.
 * No side-effects or external service calls.
 *
 * Usage:
 *   import Login from './components/Login';
 *   // <Login />
 *
 * Styling accents follow:
 *   - Primary (#3b82f6): .login-primary
 *   - Success (#06b6d4): .login-success
 */
const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  // Handle input changes for controlled fields
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Toggle password visibility for UX
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  // Submit handler: prevent default and log state
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission by logging
    console.log("Login form submitted:", form);
  };

  return (
    <div className="login-container" style={{ maxWidth: 360, margin: "2rem auto", padding: "2rem", background: "#fff", borderRadius: "1rem", boxShadow: "0 2px 8px rgba(59,130,246,0.07)" }}>
      <h2 className="login-title" style={{ color: "#3b82f6", marginBottom: "1rem", textAlign: "center", fontWeight: 700 }}>Sign in to your account</h2>
      <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
        <div className="login-field" style={{ marginBottom: "1.2rem" }}>
          <label htmlFor="login-email" className="login-label" style={{ display: "block", color: "#111827", fontWeight: 600, marginBottom: 6 }}>
            Email address
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="username"
            placeholder="you@example.com"
            className="login-input"
            style={{
              padding: "0.5rem 0.75rem",
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              width: "100%",
              outline: "none",
              fontSize: 16
            }}
            aria-label="Email address"
          />
        </div>
        <div className="login-field" style={{ marginBottom: "1.2rem" }}>
          <label htmlFor="login-password" className="login-label" style={{ display: "block", color: "#111827", fontWeight: 600, marginBottom: 6 }}>
            Password
          </label>
          <div style={{ position: "relative" }}>
            <input
              id="login-password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              placeholder="********"
              className="login-input"
              style={{
                padding: "0.5rem 0.75rem",
                border: "1px solid #e5e7eb",
                borderRadius: 8,
                width: "100%",
                outline: "none",
                fontSize: 16
              }}
              aria-label="Password"
            />
            <button
              type="button"
              onClick={handleTogglePassword}
              aria-label={showPassword ? "Hide password" : "Show password"}
              style={{
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                color: "#64748b"
              }}
              tabIndex={-1}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="login-btn login-primary"
          style={{
            width: "100%",
            padding: "0.75rem 0",
            background: "#3b82f6",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 16,
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(59,130,246,0.09)",
            transition: "background 0.2s"
          }}
        >
          Sign In
        </button>
      </form>
      {/* Style guide: Use .login-primary for #3b82f6, .login-success for #06b6d4 */}
      {/* For integration: 
          import Login from "./components/Login";
          <Login />
      */}
    </div>
  );
};

export default Login;
