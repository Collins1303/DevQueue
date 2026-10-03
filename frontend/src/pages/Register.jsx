// Import Link for navigation between authentication pages.
import { Link } from "react-router-dom";

// Import useState to manage form values and loading state.
import { useState } from "react";

function Register() {
  // Store the first name entered by the user.
  const [firstName, setFirstName] = useState("");

  // Store the last name entered by the user.
  const [lastName, setLastName] = useState("");

  // Store the email entered by the user.
  const [email, setEmail] = useState("");

  // Store the password entered by the user.
  const [password, setPassword] = useState("");

  // Store the confirmation password.
  const [confirmPassword, setConfirmPassword] = useState("");

  // Track whether the registration form is submitting.
  const [isLoading, setIsLoading] = useState(false);

  // Store a temporary form message.
  const [message, setMessage] = useState("");

  // Handle registration form submission.
  const handleSubmit = (event) => {
    // Prevent the browser from refreshing.
    event.preventDefault();

    // Prevent repeated submissions while loading.
    if (isLoading) {
      return;
    }

    // Check that both passwords match.
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    // Start the loading animation.
    setIsLoading(true);

    // Clear any previous message.
    setMessage("");

    // Simulate a backend registration request for now.
    setTimeout(() => {
      // Stop the loading animation.
      setIsLoading(false);

      // Display a temporary message.
      setMessage(
        "Registration demonstration completed. Backend registration will be connected next."
      );
    }, 2000);
  };

  return (
    <main className="form-page">
      {/* Registration heading and description. */}
      <h1>Create a DevQueue Account</h1>

      <p>Register to start managing your projects.</p>

      {/* Registration form. */}
      <form className="auth-form" onSubmit={handleSubmit}>
        {/* First name field. */}
        <label htmlFor="firstName">First Name</label>

        <input
          id="firstName"
          type="text"
          placeholder="Enter your first name"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          required
        />

        {/* Last name field. */}
        <label htmlFor="lastName">Last Name</label>

        <input
          id="lastName"
          type="text"
          placeholder="Enter your last name"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          required
        />

        {/* Email field. */}
        <label htmlFor="email">Email</label>

        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        {/* Password field. */}
        <label htmlFor="password">Password</label>

        <input
          id="password"
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          minLength="8"
          required
        />

        {/* Confirm-password field. */}
        <label htmlFor="confirmPassword">Confirm Password</label>

        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          minLength="8"
          required
        />

        {/* Registration button with loading animation. */}
        <button
          type="submit"
          className="primary-button"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner"></span>
              Registering...
            </>
          ) : (
            "Register"
          )}
        </button>
      </form>

      {/* Display validation or temporary response messages. */}
      {message && <p className="success-message">{message}</p>}

      {/* Login navigation link. */}
      <p className="auth-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </main>
  );
}

export default Register;