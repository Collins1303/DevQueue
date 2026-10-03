// Import Link for page navigation.
import { Link } from "react-router-dom";

// Import shared styles.
import "../projects.css";

// Team page component.
function Team() {
  return (
    <div className="simple-page">
      {/* Page heading. */}
      <header className="simple-page-header">
        <div>
          <h1>Team</h1>
          <p>Manage your project team members.</p>
        </div>

        {/* Navigate back to the dashboard. */}
        <Link to="/dashboard" className="back-link">
          ← Dashboard
        </Link>
      </header>

      {/* Temporary team content. */}
      <section className="dashboard-panel">
        <h2>Team Members</h2>

        <p>
          Team members will be displayed here after we
          connect the page to the backend.
        </p>
      </section>
    </div>
  );
}

// Export the Team page.
export default Team;