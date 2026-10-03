/*
 * DevQueue Dashboard Page
 *
 * This page contains:
 * 1. The reusable dark sidebar navigation.
 * 2. The top dashboard header.
 * 3. Statistics cards.
 * 4. Recent tasks.
 * 5. Task status overview.
 * 6. Project overview.
 */

// Import Link for navigation between React pages.
import { Link } from "react-router-dom";

// Import the reusable dashboard sidebar.
import Sidebar from "../components/Sidebar";

// Import the dashboard styles.
import "../dashboard.css";

function Dashboard() {
  // Sample statistics for the dashboard.
  // These values will later come from the Spring Boot backend.
  const statistics = [
    {
      title: "Total Projects",
      value: "4",
      change: "↑ 1 since last week",
      type: "projects",
    },
    {
      title: "Total Tasks",
      value: "18",
      change: "↑ 3 since last week",
      type: "tasks",
    },
    {
      title: "Completed",
      value: "9",
      change: "↑ 2 since last week",
      type: "completed",
    },
    {
      title: "In Progress",
      value: "6",
      change: "↑ 1 since last week",
      type: "progress",
    },
    {
      title: "Overdue",
      value: "3",
      change: "↓ 1 since last week",
      type: "overdue",
    },
  ];

  // Sample recent tasks.
  // These will later be retrieved from the Spring Boot backend.
  const recentTasks = [
    {
      title: "Fix login authentication bug",
      project: "ShowmanHouse",
      status: "IN PROGRESS",
      priority: "HIGH",
      dueDate: "Aug 30, 2026",
    },
    {
      title: "Create dashboard UI",
      project: "ShowmanHouse",
      status: "TODO",
      priority: "MEDIUM",
      dueDate: "Aug 28, 2026",
    },
    {
      title: "Write unit tests for API",
      project: "DevQueue",
      status: "DONE",
      priority: "MEDIUM",
      dueDate: "Aug 26, 2026",
    },
    {
      title: "Update project documentation",
      project: "DevQueue",
      status: "IN REVIEW",
      priority: "LOW",
      dueDate: "Aug 29, 2026",
    },
    {
      title: "Deploy to production",
      project: "ShowmanHouse",
      status: "TODO",
      priority: "HIGH",
      dueDate: "Sep 2, 2026",
    },
  ];

  // Sample projects for the dashboard.
  // These will later come from the Spring Boot backend.
  const projects = [
    {
      name: "ShowmanHouse",
      description: "Event management website",
      tasks: "5 tasks",
    },
    {
      name: "DevQueue",
      description: "Team task management system",
      tasks: "8 tasks",
    },
    {
      name: "E-Commerce API",
      description: "Backend service",
      tasks: "3 tasks",
    },
    {
      name: "Weather App",
      description: "React frontend app",
      tasks: "2 tasks",
    },
  ];

  return (
    <div className="dashboard-layout">

      {/* Reusable dashboard sidebar. */}
      <Sidebar />

      {/* =================================================
          MAIN DASHBOARD CONTENT
          ================================================= */}

      <main className="dashboard-main">

        {/* =================================================
            TOP DASHBOARD HEADER
            ================================================= */}

        <header className="dashboard-header">

          {/* Search input. */}
          <div className="dashboard-search">
            <span>⌕</span>

            <input
              type="search"
              placeholder="Search projects, tasks, or users..."
              aria-label="Search projects, tasks, or users"
            />
          </div>

          {/* Header actions. */}
          <div className="header-actions">

            {/* Notification button. */}
            <button
              type="button"
              className="notification-button"
              aria-label="View notifications"
            >
              ♧

              {/* Small notification indicator. */}
              <span className="notification-dot"></span>
            </button>

            {/* Logged-in user information. */}
            <div className="header-user">

              {/* User avatar. */}
              <div className="profile-avatar">
                C
              </div>

              {/* User name and role. */}
              <div className="header-user-details">
                <strong>Collins Ilochi</strong>
                <span>Developer</span>
              </div>

              {/* Dropdown indicator. */}
              <span>⌄</span>
            </div>
          </div>
        </header>

        {/* =================================================
            MAIN DASHBOARD CONTENT
            ================================================= */}

        <div className="dashboard-content">

          {/* Welcome message. */}
          <section className="dashboard-welcome">
            <h1>
              Welcome back, Collins 👋
            </h1>

            <p>
              Here's what's happening with your projects today.
            </p>
          </section>

          {/* =================================================
              STATISTICS CARDS
              ================================================= */}

          <section className="statistics-grid">

            {/* Create one statistics card for each statistic. */}
            {statistics.map((statistic) => (
              <article
                className={`stat-card ${statistic.type}`}
                key={statistic.title}
              >

                {/* Icon and title. */}
                <div className="stat-card-top">

                  {/* Display a different icon based on the statistic type. */}
                  <div className="stat-icon">
                    {statistic.type === "projects" && "▣"}

                    {statistic.type === "tasks" && "☷"}

                    {statistic.type === "completed" && "✓"}

                    {statistic.type === "progress" && "◷"}

                    {statistic.type === "overdue" && "!"}
                  </div>

                  {/* Statistic title. */}
                  <span className="stat-title">
                    {statistic.title}
                  </span>
                </div>

                {/* Statistic value. */}
                <h2>
                  {statistic.value}
                </h2>

                {/* Weekly change. */}
                <p>
                  {statistic.change}
                </p>
              </article>
            ))}
          </section>

          {/* =================================================
              DASHBOARD LOWER CONTENT
              ================================================= */}

          <div className="dashboard-columns">

            {/* =================================================
                RECENT TASKS TABLE
                ================================================= */}

            <section className="dashboard-panel recent-tasks-panel">

              {/* Panel heading. */}
              <div className="panel-heading">

                <h2>
                  Recent Tasks
                </h2>

                {/* Navigate to the complete tasks page. */}
                <Link to="/tasks">
                  View all →
                </Link>
              </div>

              {/* Tasks table wrapper. */}
              <div className="tasks-table-wrapper">

                <table className="tasks-table">

                  {/* Table headings. */}
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Project</th>
                      <th>Status</th>
                      <th>Priority</th>
                      <th>Due Date</th>
                    </tr>
                  </thead>

                  {/* Table data. */}
                  <tbody>

                    {/* Display every recent task. */}
                    {recentTasks.map((task) => (
                      <tr key={task.title}>

                        {/* Task title. */}
                        <td>
                          <span className="task-title">
                            <span className="task-dot"></span>
                            {task.title}
                          </span>
                        </td>

                        {/* Project name. */}
                        <td>
                          {task.project}
                        </td>

                        {/* Task status. */}
                        <td>
                          <span
                            className={`status-badge ${task.status
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`}
                          >
                            {task.status}
                          </span>
                        </td>

                        {/* Task priority. */}
                        <td>
                          <span
                            className={`priority-badge ${task.priority.toLowerCase()}`}
                          >
                            {task.priority}
                          </span>
                        </td>

                        {/* Task due date. */}
                        <td>
                          {task.dueDate}
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* =================================================
                TASK STATUS OVERVIEW
                ================================================= */}

            <section className="dashboard-panel status-overview-panel">

              {/* Panel heading. */}
              <div className="panel-heading">
                <h2>
                  Task Status Overview
                </h2>
              </div>

              <div className="status-overview">

                {/* Decorative chart for the dashboard. */}
                <div className="status-chart">

                  {/* Center of the chart. */}
                  <div className="chart-center">
                    <strong>
                      18
                    </strong>

                    <span>
                      Total Tasks
                    </span>
                  </div>
                </div>

                {/* Chart legend. */}
                <div className="status-legend">

                  {/* TODO tasks. */}
                  <p>
                    <span className="legend-dot todo"></span>
                    TODO
                    <strong>5</strong>
                  </p>

                  {/* In-progress tasks. */}
                  <p>
                    <span className="legend-dot in-progress"></span>
                    IN PROGRESS
                    <strong>6</strong>
                  </p>

                  {/* Tasks under review. */}
                  <p>
                    <span className="legend-dot review"></span>
                    REVIEW
                    <strong>2</strong>
                  </p>

                  {/* Completed tasks. */}
                  <p>
                    <span className="legend-dot done"></span>
                    DONE
                    <strong>9</strong>
                  </p>

                </div>
              </div>
            </section>
          </div>

          {/* =================================================
              MY PROJECTS
              ================================================= */}

          <section className="dashboard-panel projects-panel">

            {/* Projects panel heading. */}
            <div className="panel-heading">

              <h2>
                My Projects
              </h2>

              {/* Navigate to the complete Projects page. */}
              <Link to="/projects">
                View all →
              </Link>
            </div>

            {/* Projects list. */}
            <div className="projects-list">

              {/* Display every project. */}
              {projects.map((project) => (

                /*
                 * Each project is now a React Router Link.
                 * This makes the project clickable without
                 * refreshing the entire application.
                 */
                <Link
                  to="/projects"
                  className="project-list-item"
                  key={project.name}
                >

                  {/* Project icon. */}
                  <div className="project-icon">
                    ▣
                  </div>

                  {/* Project name and description. */}
                  <div className="project-details">
                    <strong>
                      {project.name}
                    </strong>

                    <span>
                      {project.description}
                    </span>
                  </div>

                  {/* Number of project tasks. */}
                  <span className="project-task-count">
                    {project.tasks}
                  </span>

                  {/* Arrow indicating that the project can be opened. */}
                  <span className="project-arrow">
                    ›
                  </span>

                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

// Export the Dashboard component.
export default Dashboard;