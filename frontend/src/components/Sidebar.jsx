/*
 * DevQueue Reusable Sidebar
 *
 * Desktop: the sidebar is always visible on the left.
 * Mobile:  the sidebar is hidden and slides in from the LEFT
 *          when the hamburger button (top left) is clicked.
 */

import { useState } from "react";

// Renders elements outside their parent so nothing can clip them.
import { createPortal } from "react-dom";

// Link is used for navigation between React pages.
import { Link } from "react-router-dom";

// The reusable DevQueue logo.
import Logo from "./Logo";

function Sidebar() {
  // Tracks whether the mobile sidebar is open.
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Opens the sidebar if closed, closes it if open.
  const toggleSidebar = () => {
    setIsSidebarOpen((previousState) => !previousState);
  };

  // Closes the sidebar.
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/*
        The hamburger button and dark backdrop are rendered
        directly on <body> using a portal. This guarantees that
        no parent element can hide or move them.
      */}
      {createPortal(
        <>
          {/* Hamburger button (only visible on mobile). */}
          <button
            type="button"
            className={`mobile-menu-button ${
              isSidebarOpen ? "menu-button-open" : ""
            }`}
            onClick={toggleSidebar}
            aria-label={isSidebarOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isSidebarOpen}
          >
            {/* Three lines that form the hamburger icon. */}
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Dark backdrop. Clicking it closes the sidebar. */}
          {isSidebarOpen && (
            <div
              className="sidebar-backdrop"
              onClick={closeSidebar}
              aria-hidden="true"
            ></div>
          )}
        </>,
        document.body
      )}

      {/* The sidebar itself. */}
      <aside
        className={`dashboard-sidebar ${
          isSidebarOpen ? "sidebar-mobile-open" : ""
        }`}
      >
        {/* DevQueue logo. */}
        <div className="sidebar-logo">
          <Logo variant="dark" />
        </div>

        {/* Main navigation. */}
        <nav className="sidebar-navigation">
          {/* Dashboard link. */}
          <Link to="/dashboard" className="sidebar-link" onClick={closeSidebar}>
            <span className="sidebar-icon">⌂</span>
            <span>Dashboard</span>
          </Link>

          {/* Projects link. */}
          <Link to="/projects" className="sidebar-link" onClick={closeSidebar}>
            <span className="sidebar-icon">▣</span>
            <span>Projects</span>
          </Link>

          {/* My Tasks link. */}
          <Link to="/tasks" className="sidebar-link" onClick={closeSidebar}>
            <span className="sidebar-icon">☑</span>
            <span>My Tasks</span>

            {/* Number of pending tasks. */}
            <span className="notification-badge">4</span>
          </Link>

          {/* Team link. */}
          <Link to="/team" className="sidebar-link" onClick={closeSidebar}>
            <span className="sidebar-icon">♧</span>
            <span>Team</span>
          </Link>

          {/* Reports link. */}
          <Link to="/reports" className="sidebar-link" onClick={closeSidebar}>
            <span className="sidebar-icon">▥</span>
            <span>Reports</span>
          </Link>

          {/* Settings link. */}
          <Link to="/settings" className="sidebar-link" onClick={closeSidebar}>
            <span className="sidebar-icon">⚙</span>
            <span>Settings</span>
          </Link>
        </nav>

        {/* User profile at the bottom of the sidebar. */}
        <div className="sidebar-profile">
          {/* User avatar. */}
          <div className="profile-avatar">C</div>

          {/* User name and role. */}
          <div className="profile-details">
            <strong>Collins Ilochi</strong>
            <span>Developer</span>
          </div>

          {/* Dropdown indicator. */}
          <span className="profile-arrow">⌄</span>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;