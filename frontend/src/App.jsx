
/*
 * Main DevQueue application component.
 *
 * This component controls:
 * 1. Application routes.
 * 2. The public website navbar.
 * 3. The public website footer.
 *
 * The dashboard has its own navigation layout,
 * so the public navbar and footer are hidden there.
 */

// Import React Router components.
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Import the main application stylesheet.
import "./App.css";

// Import shared public website components.
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Import application pages.
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
// Import the projects page.
import Projects from "./pages/Projects";
// Import the project details page.
import ProjectDetails from "./pages/ProjectDetails";
// Import the Tasks page.
import Tasks from "./pages/Tasks";

// Import the Team page.
import Team from "./pages/Team";

// Import the Reports page.
import Reports from "./pages/Reports";

// Import the Settings page.
import Settings from "./pages/Settings";

/*
 * Application component.
 *
 * BrowserRouter in main.jsx provides the router context
 * needed by useLocation().
 */
function App() {
  // Get the current URL path.
  const location = useLocation();

  // Check whether the user is currently on the dashboard.
  const isDashboard = location.pathname === "/dashboard";

  return (
    <div className={isDashboard ? "dashboard-app" : "app"}>
      {/* 
       * Display the public navbar only on public pages.
       *
       * The dashboard already has its own sidebar navigation.
       */}
      {!isDashboard && <Navbar />}

      {/* Application routes. */}
      <Routes>
        {/* Public homepage. */}
        <Route path="/" element={<Home />} />

        {/* Authentication pages. */}
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        {/* Dashboard page. */}
        <Route path="/dashboard" element={<Dashboard />} />
		
		{/* Projects page route. */}
		<Route path="/projects" element={<Projects />} />
		
		{/* Dynamic project details route. */}
		<Route
		  path="/projects/:projectId"
		  element={<ProjectDetails />}
		/>
		
		{/* Route for the My Tasks page. */}
		<Route path="/tasks" element={<Tasks />} />
		
		{/* Route for the Team page. */}
		<Route path="/team" element={<Team />} />

		{/* Route for the Reports page. */}
		<Route path="/reports" element={<Reports />} />

		{/* Route for the Settings page. */}
		<Route path="/settings" element={<Settings />} />
      </Routes>

      {/* 
       * Display the public footer only when the user
       * is not on the dashboard.
       */}
      {!isDashboard && <Footer />}
    </div>
  );
}

export default App;