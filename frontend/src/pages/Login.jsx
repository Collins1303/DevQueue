// Import Link for navigation between authentication pages.
import { Link } from "react-router-dom";

// Import useState to manage form values and loading state.
import { useState } from "react";

function Login() {
  // Store the email entered by the user.
  const [email, setEmail] = useState("");

  // Store the password entered by the user.
  const [password, setPassword] = useState("");

  // Track whether the login form is submitting.
  const [isLoading, setIsLoading] = useState(false);

  // Store a temporary message after submission.
  const [message, setMessage] = useState("");

  // Handle login form submission.
  const handleSubmit = (event) => {
    // Prevent the page from refreshing.
    event.preventDefault();

    // Prevent repeated clicks while loading.
    if (isLoading) {
      return;
    }

    // Start the loading animation.
    setIsLoading(true);

    // Remove any previous message.
    setMessage("");

    // Simulate a backend login request for now.
    setTimeout(() => {
      // Stop the loading animation.
      setIsLoading(false);

      // Display a temporary message.
      setMessage(
        "Login demonstration completed. Backend authentication will be connected next."
      );
    }, 2000);
  };

  return (
    <main className="form-page">
      {/* Login heading and description. */}
      <h1>Login to DevQueue</h1>

      <p>Enter your account details to continue.</p>

      {/* Login form. */}
      <form className="auth-form" onSubmit={handleSubmit}>
        {/* Email input. */}
        <label htmlFor="email">Email</label>

        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        {/* Password input. */}
        <label htmlFor="password">Password</label>

        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {/* Forgot-password navigation link. */}
        <Link to="/forgot-password" className="forgot-password">
          Forgot Password?
        </Link>

        {/* Login button with loading animation. */}
        <button
          type="submit"
          className="primary-button"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner"></span>
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>

      {/* Display the temporary response message. */}
      {message && <p className="success-message">{message}</p>}

      {/* Registration navigation link. */}
      <p className="auth-link">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </main>
  );
}

export default Login;