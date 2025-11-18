import React, { useState } from "react";
import styles from "./Login.module.css";
import { Button } from "./ui";

/**
 * PUBLIC_INTERFACE
 * Login - modern, accessible login card.
 *
 * Usage:
 *   import Login from "./components/Login";
 *   <Login />
 */
const Login = () => {
  // Local state for controlled inputs and error simulation
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({});
  const [error, setError] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Simulate basic validation: show error if empty and field is touched
  const validate = () => {
    const errors = {};
    if (!form.email) errors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = "Please enter a valid email.";
    if (!form.password) errors.password = "Password is required.";
    else if (form.password.length < 6)
      errors.password = "Password must be at least 6 characters.";
    return errors;
  };

  // Handle controlled input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error[e.target.name]) setError({ ...error, [e.target.name]: undefined });
  };

  // Field blur (for showing error only after touch)
  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  // Toggle password visibility
  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    const errors = validate();
    setError(errors);
    if (Object.keys(errors).length === 0) {
      setSubmitting(true);
      // Simulate async login
      setTimeout(() => {
        setSubmitting(false);
        alert(`Logged in as: ${form.email}`);
      }, 500);
    }
  };

  const emailError = touched.email && error.email;
  const passwordError = touched.password && error.password;

  return (
    <div className={styles["login-outer"]}>
      <div className={styles["login-card"]} role="main" aria-labelledby="login-title">
        <h2 className={styles["login-title"]} id="login-title">
          Sign in to your account
        </h2>
        <form
          className={styles["login-form"]}
          onSubmit={handleSubmit}
          autoComplete="off"
          noValidate
        >
          <div className={styles["login-field"]}>
            <label
              htmlFor="login-email"
              className={styles["login-label"]}
            >
              Email address
            </label>
            <div className={styles["login-input-wrap"]}>
              <input
                id="login-email"
                name="email"
                type="email"
                className={styles["login-input"]}
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-label="Email address"
                aria-invalid={!!emailError}
                aria-describedby={emailError ? "login-email-error" : undefined}
                autoComplete="username"
                required
                placeholder="you@example.com"
                disabled={submitting}
              />
            </div>
            <div
              className={styles["login-error"]}
              id="login-email-error"
              role={emailError ? "alert" : undefined}
              aria-live="polite"
            >
              {emailError || "\u00A0"}
            </div>
          </div>
          <div className={styles["login-field"]}>
            <label
              htmlFor="login-password"
              className={styles["login-label"]}
            >
              Password
            </label>
            <div className={styles["login-input-wrap"]}>
              <input
                id="login-password"
                name="password"
                type={showPassword ? "text" : "password"}
                className={styles["login-input"]}
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-label="Password"
                aria-invalid={!!passwordError}
                aria-describedby={passwordError ? "login-password-error" : undefined}
                autoComplete="current-password"
                required
                placeholder="••••••••"
                disabled={submitting}
              />
              <button
                type="button"
                tabIndex={0}
                className={styles["login-toggle-btn"]}
                aria-label={showPassword ? "Hide password" : "Show password"}
                title={showPassword ? "Hide password" : "Show password"}
                onClick={handleTogglePassword}
                disabled={submitting}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            <div
              className={styles["login-error"]}
              id="login-password-error"
              role={passwordError ? "alert" : undefined}
              aria-live="polite"
            >
              {passwordError || "\u00A0"}
            </div>
          </div>
          <Button
            type="submit"
            variant="primary"
            size="md"
            fullWidth
            loading={submitting}
            disabled={submitting}
            aria-label="Sign In"
          >
            Sign In
          </Button>
        </form>
        <footer className={styles["login-footer"]}>
          © {new Date().getFullYear()} Kavia • Secure &amp; simple login
        </footer>
      </div>
    </div>
  );
};

export default Login;
