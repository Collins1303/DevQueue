// Import Link for navigation between pages.
import { Link } from "react-router-dom";

// Import the shared project styles.
// We can reuse some existing layout styles.
import "../projects.css";

// My Tasks page component.
function Tasks() {
  return (
    <div className="simple-page">
      {/* Page heading. */}
      <header className="simple-page-header">
        <div>
          <h1>My Tasks</h1>
          <p>View and manage tasks assigned to you.</p>
        </div>

        {/* Link back to the dashboard. */}
        <Link to="/dashboard" className="back-link">
          ← Dashboard
        </Link>
      </header>

      {/* Temporary content until we connect the backend. */}
      <section className="dashboard-panel">
        <h2>Your Tasks</h2>

        <p>
          Your assigned tasks will appear here once we connect
          this page to the Spring Boot backend.
        </p>
      </section>
    </div>
  );
}

// Export the Tasks page.
export default Tasks;