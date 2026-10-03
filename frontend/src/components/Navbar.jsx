
/*
 * Navigation bar component.
 *
 * This component displays:
 * 1. The DevQueue logo.
 * 2. Navigation links.
 * 3. The Login button.
 */

// Import Link for navigation without refreshing the page.
import { Link } from "react-router-dom";

// Import the reusable DevQueue logo.
import Logo from "./Logo";

function Navbar() {
  return (
    <nav className="navbar">
      {/* Clicking the logo takes the user to the home page. */}
      <Link to="/" className="logo-link">
        <Logo variant="light" />
      </Link>

      {/* Main navigation links. */}
      <div className="nav-links">
        <Link to="/">Home</Link>

        {/* These links will be connected to page sections later. */}
        <Link to="/#features">Features</Link>

        <Link to="/#about">About</Link>
      </div>

      {/* Login navigation button. */}
      <Link to="/login" className="login-button">
        Login
      </Link>
    </nav>
  );
}

export default Navbar;