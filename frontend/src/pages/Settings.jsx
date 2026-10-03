// Import Link for navigation between pages.
import { Link } from "react-router-dom";

// Import shared page styles.
import "../projects.css";

// Settings page component.
function Settings() {
  return (
    <div className="simple-page">
      {/* Page heading and description. */}
      <header className="simple-page-header">
        <div>
          <h1>Settings</h1>

          <p>
            Manage your DevQueue account settings.
          </p>
        </div>

        {/* Return to the dashboard. */}
        <Link to="/dashboard" className="back-link">
          ← Dashboard
        </Link>
      </header>

      {/* Settings content. */}
      <section className="dashboard-panel">
        <h2>Account Settings</h2>

        <p>
          Your account and application settings will appear here.
        </p>
      </section>
    </div>
  );
}

// Export the Settings page.
export default Settings;