// Import Link so the user can navigate back to the login page.
import { Link } from "react-router-dom";

// Import useState to manage the email input and loading state.
import { useState } from "react";

function ForgotPassword() {
  // Store the email entered by the user.
  const [email, setEmail] = useState("");

  // Track whether the form is currently submitting.
  const [isLoading, setIsLoading] = useState(false);

  // Store a message that will be displayed after submission.
  const [message, setMessage] = useState("");

  // Handle the forgot-password form submission.
  const handleSubmit = (event) => {
    // Prevent the browser from refreshing the page.
    event.preventDefault();

    // Prevent another submission while the button is loading.
    if (isLoading) {
      return;
    }

    // Start the loading state.
    setIsLoading(true);

    // Clear any previous message.
    setMessage("");

    // Simulate a request to the backend for now.
    setTimeout(() => {
      // Stop the loading animation.
      setIsLoading(false);

      // Display a temporary success message.
      setMessage(
        "If an account exists with this email, password reset instructions will be sent."
      );
    }, 2000);
  };

  return (
    <main className="form-page">
      {/* Page heading and description. */}
      <h1>Forgot Password?</h1>

      <p>
        Enter your email address and we will help you reset your password.
      </p>

      {/* Forgot-password form. */}
      <form className="auth-form" onSubmit={handleSubmit}>
        {/* Email field. */}
        <label htmlFor="email">Email Address</label>

        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        {/* Submit button with loading state. */}
        <button
          type="submit"
          className="primary-button"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner"></span>
              Sending...
            </>
          ) : (
            "Reset Password"
          )}
        </button>
      </form>

      {/* Display the response message when available. */}
      {message && <p className="success-message">{message}</p>}

      {/* Link back to the login page. */}
      <p className="auth-link">
        Remember your password? <Link to="/login">Login</Link>
      </p>
    </main>
  );
}

export default ForgotPassword;