/*
 * DevQueue Projects Page
 *
 * This page displays the projects belonging to the user.
 *
 * Projects are loaded from the Spring Boot backend.
 *
 * This page also allows the user to create a new project.
 */

import { useEffect, useState } from "react";

// Import Link for navigation between pages.
import { Link } from "react-router-dom";

// Import the functions used to communicate with the backend.
import {
  getProjects,
  createProject,
} from "../api/api";

// Import the project page stylesheet.
import "../projects.css";

function Projects() {
  /*
   * Stores the projects received from Spring Boot.
   */
  const [projects, setProjects] = useState([]);

  /*
   * Controls whether the page is currently loading projects.
   */
  const [loading, setLoading] = useState(true);

  /*
   * Stores an error message if the backend request fails.
   */
  const [error, setError] = useState("");

  /*
   * Stores whatever the user types into the search box.
   */
  const [searchTerm, setSearchTerm] = useState("");

  /*
   * Controls whether the Create Project modal is visible.
   */
  const [showCreateModal, setShowCreateModal] = useState(false);

  /*
   * Controls the loading state while a project is being created.
   */
  const [creatingProject, setCreatingProject] = useState(false);

  /*
   * Stores errors that happen while creating a project.
   */
  const [createError, setCreateError] = useState("");

  /*
   * Stores the information entered into the Create Project form.
   */
  const [projectForm, setProjectForm] = useState({
    name: "",
    description: "",
    status: "ACTIVE",
    startDate: "",
    dueDate: "",
    organizationId: "1",
  });

  /*
   * Load projects when the page first opens.
   */
  useEffect(() => {
    loadProjects();
  }, []);

  /*
   * Gets the projects from the Spring Boot backend.
   */
  async function loadProjects() {
    try {
      // Start the loading state.
      setLoading(true);

      // Clear any previous error.
      setError("");

      // Request projects from the backend.
      const data = await getProjects();

      // Store the projects returned by Spring Boot.
      setProjects(data);
    } catch (err) {
      // Show the actual error in the browser console.
      console.error("Error loading projects:", err);

      // Show a friendly message to the user.
      setError(
        "Unable to load projects. Please make sure the backend is running."
      );
    } finally {
      // Stop the loading state.
      setLoading(false);
    }
  }

  /*
   * Updates the Create Project form whenever
   * the user changes one of the input fields.
   */
  function handleFormChange(event) {
    const { name, value } = event.target;

    setProjectForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  }

  /*
   * Opens the Create Project modal.
   */
  function openCreateModal() {
    // Clear any previous creation error.
    setCreateError("");

    // Open the modal.
    setShowCreateModal(true);
  }

  /*
   * Closes the Create Project modal.
   */
  function closeCreateModal() {
    // Do not close the modal while the project is being created.
    if (creatingProject) {
      return;
    }

    setShowCreateModal(false);
    setCreateError("");
  }

  /*
   * Sends the new project to Spring Boot.
   */
  async function handleCreateProject(event) {
    // Prevent the browser from refreshing the page.
    event.preventDefault();

    // Clear any previous creation error.
    setCreateError("");

    /*
     * Basic validation.
     */
    if (!projectForm.name.trim()) {
      setCreateError("Please enter a project name.");
      return;
    }

    if (!projectForm.startDate) {
      setCreateError("Please select a start date.");
      return;
    }

    if (!projectForm.dueDate) {
      setCreateError("Please select a due date.");
      return;
    }

    if (
      new Date(projectForm.dueDate) <
      new Date(projectForm.startDate)
    ) {
      setCreateError(
        "The due date cannot be before the start date."
      );
      return;
    }

    /*
     * Make sure the organization ID is a valid number.
     */
    const organizationId = Number(
      projectForm.organizationId
    );

    if (!organizationId) {
      setCreateError(
        "Please enter a valid organization ID."
      );
      return;
    }

    try {
      // Disable the button and show the loading state.
      setCreatingProject(true);

      /*
       * Create the project through Spring Boot.
       */
      await createProject({
        name: projectForm.name.trim(),

        description: projectForm.description.trim(),

        status: projectForm.status,

        startDate: projectForm.startDate,

        dueDate: projectForm.dueDate,

        organizationId: organizationId,
      });

      /*
       * Reset the form after successful creation.
       */
      setProjectForm({
        name: "",
        description: "",
        status: "ACTIVE",
        startDate: "",
        dueDate: "",
        organizationId: "1",
      });

      /*
       * Close the modal.
       */
      setShowCreateModal(false);

      /*
       * Load the projects again so the new project
       * immediately appears in the table.
       */
      await loadProjects();
    } catch (err) {
      // Log the actual error for debugging.
      console.error("Error creating project:", err);

      // Show a friendly message to the user.
      setCreateError(
        "Unable to create the project. Please check your information and try again."
      );
    } finally {
      // Re-enable the Create button.
      setCreatingProject(false);
    }
  }

  /*
   * Filter projects according to the search box.
   */
  const filteredProjects = projects.filter((project) => {
    const search = searchTerm.toLowerCase();

    return (
      project.name?.toLowerCase().includes(search) ||
      project.description?.toLowerCase().includes(search)
    );
  });

  return (
    <main className="projects-page">

      {/* Link that returns the user to the dashboard. */}
      <Link
        to="/dashboard"
        className="back-to-dashboard"
      >
        ← Back to Dashboard
      </Link>

      {/* Page heading and create project button. */}
      <section className="projects-page-header">
        <div>
          <h1>All Projects</h1>

          <p>
            Manage and organize all your development projects.
          </p>
        </div>

        {/* Opens the Create Project modal. */}
        <button
          type="button"
          className="create-project-button"
          onClick={openCreateModal}
        >
          + Create Project
        </button>
      </section>

      {/* Project search field. */}
      <section className="projects-toolbar">
        <div className="projects-search">
          <span>⌕</span>

          <input
            type="search"
            placeholder="Search projects..."
            aria-label="Search projects"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />
        </div>
      </section>

      {/* Show a loading message while projects are being retrieved. */}
      {loading && (
        <section className="projects-table-panel">
          <div className="projects-message">
            <p>Loading projects...</p>
          </div>
        </section>
      )}

      {/* Show an error if the backend request fails. */}
      {!loading && error && (
        <section className="projects-table-panel">
          <div className="projects-message">
            <p>{error}</p>

            {/* Allows the user to try loading the projects again. */}
            <button
              type="button"
              onClick={loadProjects}
            >
              Try Again
            </button>
          </div>
        </section>
      )}

      {/* Display the projects when loading has finished successfully. */}
      {!loading && !error && (
        <section className="projects-table-panel">
          <div className="projects-table-wrapper">
            <table className="projects-table">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Status</th>
                  <th>Start Date</th>
                  <th>Due Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                    <tr key={project.id}>

                      {/* Project name and description. */}
                      <td>
                        <div className="project-name-cell">
                          <div className="project-table-icon">
                            ▣
                          </div>

                          <div>
                            <strong>
                              {project.name}
                            </strong>

                            <span>
                              {project.description ||
                                "No description provided."}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Project status. */}
                      <td>
                        <span className="project-status">
                          {project.status || "ACTIVE"}
                        </span>
                      </td>

                      {/* Project start date. */}
                      <td>
                        {project.startDate || "—"}
                      </td>

                      {/* Project due date. */}
                      <td>
                        {project.dueDate || "—"}
                      </td>

                      {/* Project action. */}
                      <td>
                        <Link
                          to={`/projects/${project.id}`}
                          className="view-project-button"
                        >
                          View →
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  /*
                   * Display this when there are no projects
                   * or when the search returns no results.
                   */
                  <tr>
                    <td colSpan="5">
                      <div className="projects-message">
                        <p>
                          {searchTerm
                            ? "No projects match your search."
                            : "No projects have been created yet."}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* =====================================================
          CREATE PROJECT MODAL
          ===================================================== */}

      {showCreateModal && (
        <div
          className="project-modal-overlay"
          onClick={closeCreateModal}
        >
          <div
            className="project-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            {/* Modal heading. */}
            <div className="project-modal-header">
              <div>
                <h2>Create Project</h2>

                <p>
                  Add a new project to your organization.
                </p>
              </div>

              {/* Close button. */}
              <button
                type="button"
                className="project-modal-close"
                onClick={closeCreateModal}
                disabled={creatingProject}
                aria-label="Close create project form"
              >
                ×
              </button>
            </div>

            {/* Show project creation errors. */}
            {createError && (
              <div className="project-form-error">
                {createError}
              </div>
            )}

            {/* Create Project form. */}
            <form
              className="project-form"
              onSubmit={handleCreateProject}
            >
              {/* Project name. */}
              <div className="project-form-group">
                <label htmlFor="project-name">
                  Project Name
                </label>

                <input
                  id="project-name"
                  name="name"
                  type="text"
                  placeholder="Enter project name"
                  value={projectForm.name}
                  onChange={handleFormChange}
                  disabled={creatingProject}
                  required
                />
              </div>

              {/* Project description. */}
              <div className="project-form-group">
                <label htmlFor="project-description">
                  Description
                </label>

                <textarea
                  id="project-description"
                  name="description"
                  placeholder="Describe the project..."
                  value={projectForm.description}
                  onChange={handleFormChange}
                  disabled={creatingProject}
                  rows="4"
                ></textarea>
              </div>

              {/* Status. */}
              <div className="project-form-group">
                <label htmlFor="project-status">
                  Status
                </label>

                <select
                  id="project-status"
                  name="status"
                  value={projectForm.status}
                  onChange={handleFormChange}
                  disabled={creatingProject}
                >
                  <option value="ACTIVE">
                    Active
                  </option>

                  <option value="COMPLETED">
                    Completed
                  </option>

                  <option value="ON_HOLD">
                    On Hold
                  </option>
                </select>
              </div>

              {/* Date fields. */}
              <div className="project-form-row">

                {/* Start date. */}
                <div className="project-form-group">
                  <label htmlFor="project-start-date">
                    Start Date
                  </label>

                  <input
                    id="project-start-date"
                    name="startDate"
                    type="date"
                    value={projectForm.startDate}
                    onChange={handleFormChange}
                    disabled={creatingProject}
                    required
                  />
                </div>

                {/* Due date. */}
                <div className="project-form-group">
                  <label htmlFor="project-due-date">
                    Due Date
                  </label>

                  <input
                    id="project-due-date"
                    name="dueDate"
                    type="date"
                    value={projectForm.dueDate}
                    onChange={handleFormChange}
                    disabled={creatingProject}
                    required
                  />
                </div>
              </div>

              {/* Organization ID. */}
              <div className="project-form-group">
                <label htmlFor="project-organization">
                  Organization ID
                </label>

                <input
                  id="project-organization"
                  name="organizationId"
                  type="number"
                  min="1"
                  value={projectForm.organizationId}
                  onChange={handleFormChange}
                  disabled={creatingProject}
                  required
                />

                <small>
                  Your current DevQueue organization ID is 1.
                </small>
              </div>

              {/* Form buttons. */}
              <div className="project-form-actions">

                {/* Cancel button. */}
                <button
                  type="button"
                  className="project-cancel-button"
                  onClick={closeCreateModal}
                  disabled={creatingProject}
                >
                  Cancel
                </button>

                {/* Create button. */}
                <button
                  type="submit"
                  className="create-project-submit"
                  disabled={creatingProject}
                >
                  {creatingProject ? (
                    <>
                      <span className="project-loading-spinner"></span>
                      Creating...
                    </>
                  ) : (
                    "Create Project"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default Projects;