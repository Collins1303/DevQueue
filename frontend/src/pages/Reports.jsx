// Import Link for navigation.
import { Link } from "react-router-dom";

// Import shared styles.
import "../projects.css";

// Reports page component.
function Reports() {
  return (
    <div className="simple-page">
      {/* Page heading. */}
      <header className="simple-page-header">
        <div>
          <h1>Reports</h1>
          <p>Review project and task performance.</p>
        </div>

        {/* Navigate back to the dashboard. */}
        <Link to="/dashboard" className="back-link">
          ← Dashboard
        </Link>
      </header>

      {/* Temporary reports content. */}
      <section className="dashboard-panel">
        <h2>Project Reports</h2>

        <p>
          Reports and project statistics will be displayed
          here in a future implementation.
        </p>
      </section>
    </div>
  );
}

// Export the Reports page.
export default Reports;