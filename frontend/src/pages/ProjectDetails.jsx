/*
 * DevQueue Project Details Page
 *
 * This page displays the details of a selected project.
 *
 * Project information and tasks are loaded from
 * the Spring Boot backend.
 */

// Import React hooks.
import { useEffect, useState } from "react";

// Import Link and useParams for navigation and URL parameters.
import { Link, useParams } from "react-router-dom";

// Import the functions used to communicate with the backend.
import {
  getProjectById,
  getTasksByProject,
  createTask,
  updateTask,
} from "../api/api";

// Import project page styles.
import "../projects.css";

function ProjectDetails() {
  /*
   * Read the project ID from the URL.
   *
   * Example:
   * /projects/1
   *
   * projectId will contain "1".
   */
  const { projectId } = useParams();

  /*
   * Stores the project returned by the backend.
   */
  const [project, setProject] = useState(null);

  /*
   * Stores the tasks belonging to the project.
   */
  const [tasks, setTasks] = useState([]);

  /*
   * Controls the loading state.
   */
  const [loading, setLoading] = useState(true);

  /*
   * Stores an error message if something goes wrong
   * while loading the project.
   */
  const [error, setError] = useState("");

  /*
   * Controls whether the Create Task form is visible.
   */
  const [showCreateTaskForm, setShowCreateTaskForm] =
    useState(false);

  /*
   * Stores the information entered into
   * the Create Task form.
   */
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    status: "TODO",
    priority: "MEDIUM",
    dueDate: "",
    assignedToId: "",
  });

  /*
   * Controls whether a task is currently being created.
   */
  const [creatingTask, setCreatingTask] = useState(false);

  /*
   * Stores errors that occur while creating a task.
   */
  const [taskError, setTaskError] = useState("");

  /*
   * Stores the task currently being edited.
   *
   * null means that no task is being edited.
   */
  const [editingTask, setEditingTask] = useState(null);

  /*
   * Stores the information entered into
   * the Edit Task form.
   */
  const [editTaskForm, setEditTaskForm] = useState({
    title: "",
    description: "",
    status: "TODO",
    priority: "MEDIUM",
    dueDate: "",
    assignedToId: "",
  });

  /*
   * Controls whether a task is currently being updated.
   */
  const [updatingTask, setUpdatingTask] = useState(false);

  /*
   * Stores an error message if updating
   * a task fails.
   */
  const [editTaskError, setEditTaskError] = useState("");

  /*
   * Load the project and its tasks when the page opens.
   */
  useEffect(() => {
    loadProjectDetails();
  }, [projectId]);

  /*
   * Retrieves the project and its tasks from Spring Boot.
   */
  async function loadProjectDetails() {
    try {
      // Start loading.
      setLoading(true);

      // Clear any previous error.
      setError("");

      /*
       * Request the project and its tasks.
       *
       * Promise.all allows both requests to happen together.
       */
      const [projectData, taskData] = await Promise.all([
        getProjectById(projectId),
        getTasksByProject(projectId),
      ]);

      // Store the project.
      setProject(projectData);

      // Store the project's tasks.
      setTasks(taskData);
    } catch (err) {
      // Log the actual error for debugging.
      console.error(
        "Error loading project details:",
        err
      );

      // Show a friendly message to the user.
      setError(
        "Unable to load this project. Please make sure the backend is running."
      );
    } finally {
      // Stop loading.
      setLoading(false);
    }
  }

  /*
   * Updates the Create Task form whenever
   * the user changes an input.
   */
  function handleTaskFormChange(event) {
    const { name, value } = event.target;

    setTaskForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  }

  /*
   * Sends the new task to the Spring Boot backend.
   */
  async function handleCreateTask(event) {
    event.preventDefault();

    try {
      // Start the creating state.
      setCreatingTask(true);

      // Clear any previous error.
      setTaskError("");

      /*
       * Prepare the data expected by
       * TaskRequest in Spring Boot.
       */
      const taskData = {
        title: taskForm.title,
        description: taskForm.description,
        status: taskForm.status,
        priority: taskForm.priority,
        dueDate: taskForm.dueDate || null,

        // Use the current project ID from the URL.
        projectId: Number(projectId),

        // Convert the assigned user ID to a number.
        assignedToId: taskForm.assignedToId
          ? Number(taskForm.assignedToId)
          : null,
      };

      /*
       * Send the task to Spring Boot.
       */
      await createTask(taskData);

      /*
       * Reload the project's tasks so the
       * newly created task appears immediately.
       */
      const updatedTasks =
        await getTasksByProject(projectId);

      setTasks(updatedTasks);

      /*
       * Reset the Create Task form.
       */
      setTaskForm({
        title: "",
        description: "",
        status: "TODO",
        priority: "MEDIUM",
        dueDate: "",
        assignedToId: "",
      });

      /*
       * Close the form after successful creation.
       */
      setShowCreateTaskForm(false);
    } catch (err) {
      // Log the actual error for debugging.
      console.error(
        "Error creating task:",
        err
      );

      // Show a friendly error message.
      setTaskError(
        "Unable to create the task. Please check the information and try again."
      );
    } finally {
      // Stop the creating state.
      setCreatingTask(false);
    }
  }

  /*
   * Opens the Edit Task form and fills it
   * with the selected task's current information.
   */
  function handleEditTask(task) {
    // Store the selected task.
    setEditingTask(task);

    // Clear any previous editing error.
    setEditTaskError("");

    /*
     * Fill the Edit Task form with
     * the task's existing information.
     */
    setEditTaskForm({
      title: task.title || "",
      description: task.description || "",
      status: task.status || "TODO",
      priority: task.priority || "MEDIUM",
      dueDate: task.dueDate || "",
      assignedToId: task.assignedToId
        ? String(task.assignedToId)
        : "",
    });
  }

  /*
   * Updates the Edit Task form whenever
   * the user changes an input.
   */
  function handleEditTaskFormChange(event) {
    const { name, value } = event.target;

    setEditTaskForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  }

  /*
   * Sends the edited task to Spring Boot.
   */
  async function handleUpdateTask(event) {
    event.preventDefault();

    try {
      // Start the updating state.
      setUpdatingTask(true);

      // Clear any previous error.
      setEditTaskError("");

      /*
       * Prepare the information expected
       * by TaskUpdateRequest in Spring Boot.
       */
      const taskData = {
        title: editTaskForm.title,
        description: editTaskForm.description,
        status: editTaskForm.status,
        priority: editTaskForm.priority,
        dueDate: editTaskForm.dueDate || null,

        assignedToId: editTaskForm.assignedToId
          ? Number(editTaskForm.assignedToId)
          : null,
      };

      /*
       * Send the updated task to Spring Boot.
       */
      await updateTask(
        editingTask.id,
        taskData
      );

      /*
       * Reload the tasks so the board immediately
       * displays the updated information.
       */
      const updatedTasks =
        await getTasksByProject(projectId);

      setTasks(updatedTasks);

      /*
       * Close the Edit Task form after
       * the update succeeds.
       */
      setEditingTask(null);
    } catch (err) {
      // Log the actual error for debugging.
      console.error(
        "Error updating task:",
        err
      );

      // Show a friendly error message.
      setEditTaskError(
        "Unable to update the task. Please try again."
      );
    } finally {
      // Stop the updating state.
      setUpdatingTask(false);
    }
  }

  /*
   * Show a loading message while the backend
   * is being contacted.
   */
  if (loading) {
    return (
      <main className="project-details-page">
        <div className="projects-message">
          <p>Loading project...</p>
        </div>
      </main>
    );
  }

  /*
   * Show an error if the project could not be loaded.
   */
  if (error) {
    return (
      <main className="project-details-page">
        <Link
          to="/projects"
          className="back-to-dashboard"
        >
          ← All Projects
        </Link>

        <div className="projects-message">
          <p>{error}</p>

          <button
            type="button"
            onClick={loadProjectDetails}
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  /*
   * If the backend did not return a project,
   * show a simple not-found message.
   */
  if (!project) {
    return (
      <main className="project-details-page">
        <Link
          to="/projects"
          className="back-to-dashboard"
        >
          ← All Projects
        </Link>

        <div className="projects-message">
          <p>Project not found.</p>
        </div>
      </main>
    );
  }

  /*
   * Group the backend tasks according
   * to their status.
   */
  const taskColumns = [
    {
      title: "TODO",
      className: "todo-column",

      tasks: tasks.filter(
        (task) => task.status === "TODO"
      ),
    },

    {
      title: "IN PROGRESS",
      className: "progress-column",

      tasks: tasks.filter(
        (task) => task.status === "IN_PROGRESS"
      ),
    },

    {
      title: "REVIEW",
      className: "review-column",

      tasks: tasks.filter(
        (task) =>
          task.status === "IN_REVIEW" ||
          task.status === "REVIEW"
      ),
    },

    {
      title: "DONE",
      className: "done-column",

      tasks: tasks.filter(
        (task) => task.status === "DONE"
      ),
    },
  ];

  /*
   * Calculate task statistics from
   * the real backend data.
   */
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "DONE"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) =>
      task.status === "IN_PROGRESS"
  ).length;

  /*
   * Calculate project progress.
   */
  const progress =
    totalTasks > 0
      ? Math.round(
          (completedTasks / totalTasks) * 100
        )
      : 0;

  return (
    <main className="project-details-page">
      {/* Link to return to the Projects page. */}
      <Link
        to="/projects"
        className="back-to-dashboard"
      >
        ← All Projects
      </Link>

      {/* Project header. */}
      <section className="project-details-header">
        <div className="project-details-information">
          <div className="large-project-icon">
            ▣
          </div>

          <div>
            <h1>{project.name}</h1>

            <p>
              {project.description ||
                "No description provided."}
            </p>

            <span className="project-status">
              {project.status || "ACTIVE"}
            </span>
          </div>
        </div>

        {/* Create task button. */}
        <button
          type="button"
          className="create-project-button"
          onClick={() => {
            setShowCreateTaskForm(true);
            setTaskError("");
          }}
        >
          + Create Task
        </button>
      </section>

      {/* Create Task form. */}
      {showCreateTaskForm && (
        <section className="create-task-panel">
          <div className="create-task-header">
            <h2>Create New Task</h2>

            <button
              type="button"
              onClick={() =>
                setShowCreateTaskForm(false)
              }
            >
              ×
            </button>
          </div>

          {taskError && (
            <div className="task-form-error">
              {taskError}
            </div>
          )}

          <form onSubmit={handleCreateTask}>
            <div className="task-form-group">
              <label htmlFor="task-title">
                Task Title
              </label>

              <input
                id="task-title"
                name="title"
                type="text"
                placeholder="Enter task title"
                value={taskForm.title}
                onChange={handleTaskFormChange}
                required
              />
            </div>

            <div className="task-form-group">
              <label htmlFor="task-description">
                Description
              </label>

              <textarea
                id="task-description"
                name="description"
                placeholder="Describe the task..."
                value={taskForm.description}
                onChange={handleTaskFormChange}
              />
            </div>

            <div className="task-form-row">
              <div className="task-form-group">
                <label htmlFor="task-status">
                  Status
                </label>

                <select
                  id="task-status"
                  name="status"
                  value={taskForm.status}
                  onChange={handleTaskFormChange}
                >
                  <option value="TODO">
                    TODO
                  </option>

                  <option value="IN_PROGRESS">
                    IN PROGRESS
                  </option>

                  <option value="IN_REVIEW">
                    REVIEW
                  </option>

                  <option value="DONE">
                    DONE
                  </option>
                </select>
              </div>

              <div className="task-form-group">
                <label htmlFor="task-priority">
                  Priority
                </label>

                <select
                  id="task-priority"
                  name="priority"
                  value={taskForm.priority}
                  onChange={handleTaskFormChange}
                >
                  <option value="LOW">
                    LOW
                  </option>

                  <option value="MEDIUM">
                    MEDIUM
                  </option>

                  <option value="HIGH">
                    HIGH
                  </option>
                </select>
              </div>
            </div>

            <div className="task-form-row">
              <div className="task-form-group">
                <label htmlFor="task-due-date">
                  Due Date
                </label>

                <input
                  id="task-due-date"
                  name="dueDate"
                  type="date"
                  value={taskForm.dueDate}
                  onChange={handleTaskFormChange}
                />
              </div>

              <div className="task-form-group">
                <label htmlFor="task-assigned-user">
                  Assigned User ID
                </label>

                <input
                  id="task-assigned-user"
                  name="assignedToId"
                  type="number"
                  placeholder="Optional"
                  value={taskForm.assignedToId}
                  onChange={handleTaskFormChange}
                  min="1"
                />
              </div>
            </div>

            <div className="task-form-actions">
              <button
                type="button"
                onClick={() =>
                  setShowCreateTaskForm(false)
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={creatingTask}
              >
                {creatingTask
                  ? "Creating..."
                  : "Create Task"}
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Edit Task form. */}
      {editingTask && (
        <section className="create-task-panel">
          <div className="create-task-header">
            <h2>Edit Task</h2>

            <button
              type="button"
              onClick={() =>
                setEditingTask(null)
              }
            >
              ×
            </button>
          </div>

          {editTaskError && (
            <div className="task-form-error">
              {editTaskError}
            </div>
          )}

          <form onSubmit={handleUpdateTask}>
            <div className="task-form-group">
              <label htmlFor="edit-task-title">
                Task Title
              </label>

              <input
                id="edit-task-title"
                name="title"
                type="text"
                placeholder="Enter task title"
                value={editTaskForm.title}
                onChange={handleEditTaskFormChange}
                required
              />
            </div>

            <div className="task-form-group">
              <label htmlFor="edit-task-description">
                Description
              </label>

              <textarea
                id="edit-task-description"
                name="description"
                placeholder="Describe the task..."
                value={editTaskForm.description}
                onChange={handleEditTaskFormChange}
              />
            </div>

            <div className="task-form-row">
              <div className="task-form-group">
                <label htmlFor="edit-task-status">
                  Status
                </label>

                <select
                  id="edit-task-status"
                  name="status"
                  value={editTaskForm.status}
                  onChange={
                    handleEditTaskFormChange
                  }
                >
                  <option value="TODO">
                    TODO
                  </option>

                  <option value="IN_PROGRESS">
                    IN PROGRESS
                  </option>

                  <option value="IN_REVIEW">
                    REVIEW
                  </option>

                  <option value="DONE">
                    DONE
                  </option>
                </select>
              </div>

              <div className="task-form-group">
                <label htmlFor="edit-task-priority">
                  Priority
                </label>

                <select
                  id="edit-task-priority"
                  name="priority"
                  value={editTaskForm.priority}
                  onChange={
                    handleEditTaskFormChange
                  }
                >
                  <option value="LOW">
                    LOW
                  </option>

                  <option value="MEDIUM">
                    MEDIUM
                  </option>

                  <option value="HIGH">
                    HIGH
                  </option>
                </select>
              </div>
            </div>

            <div className="task-form-row">
              <div className="task-form-group">
                <label htmlFor="edit-task-due-date">
                  Due Date
                </label>

                <input
                  id="edit-task-due-date"
                  name="dueDate"
                  type="date"
                  value={editTaskForm.dueDate}
                  onChange={
                    handleEditTaskFormChange
                  }
                />
              </div>

              <div className="task-form-group">
                <label htmlFor="edit-task-assigned-user">
                  Assigned User ID
                </label>

                <input
                  id="edit-task-assigned-user"
                  name="assignedToId"
                  type="number"
                  placeholder="Optional"
                  value={
                    editTaskForm.assignedToId
                  }
                  onChange={
                    handleEditTaskFormChange
                  }
                  min="1"
                />
              </div>
            </div>

            <div className="task-form-actions">
              <button
                type="button"
                onClick={() =>
                  setEditingTask(null)
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={updatingTask}
              >
                {updatingTask
                  ? "Updating..."
                  : "Update Task"}
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Project navigation tabs. */}
      <nav className="project-tabs">
        <a href="#overview">
          Overview
        </a>

        <a
          href="#tasks"
          className="active-tab"
        >
          Tasks
        </a>

        <a href="#team">
          Team
        </a>

        <a href="#settings">
          Settings
        </a>
      </nav>

      {/* Project summary cards. */}
      <section className="project-summary-grid">
        <div className="project-summary-card">
          <span>Total Tasks</span>

          <strong>{totalTasks}</strong>
        </div>

        <div className="project-summary-card">
          <span>Completed</span>

          <strong>{completedTasks}</strong>
        </div>

        <div className="project-summary-card">
          <span>In Progress</span>

          <strong>{inProgressTasks}</strong>
        </div>

        <div className="project-summary-card">
          <span>Team Members</span>

          <strong>—</strong>
        </div>
      </section>

      {/* Project progress. */}
      <section className="project-progress-panel">
        <div className="project-progress-heading">
          <h2>Project Progress</h2>

          <strong>{progress}%</strong>
        </div>

        <div className="project-progress-track">
          <div
            className="project-progress-fill"
            style={{
              width: `${progress}%`,
            }}
          ></div>
        </div>
      </section>

      {/* Task board. */}
      <section
        className="task-board"
        id="tasks"
      >
        {taskColumns.map((column) => (
          <div
            className={`task-column ${column.className}`}
            key={column.title}
          >
            {/* Column heading. */}
            <div className="task-column-heading">
              <h2>{column.title}</h2>

              <span>
                {column.tasks.length}
              </span>
            </div>

            {/* Tasks inside the column. */}
            <div className="task-column-list">
              {column.tasks.length > 0 ? (
                column.tasks.map((task) => (
                  <article
                    className="task-card"
                    key={task.id}
                  >
                    <h3>{task.title}</h3>

                    <span
                      className={`task-priority ${
                        task.priority
                          ? task.priority.toLowerCase()
                          : "low"
                      }`}
                    >
                      {task.priority || "LOW"}
                    </span>

                    <div className="task-card-footer">
                      <div>
                        <span>
                          👤{" "}
                          {task.assignedToId
                            ? `User #${task.assignedToId}`
                            : "Unassigned"}
                        </span>

                        <span>
                          📅{" "}
                          {task.dueDate ||
                            "No due date"}
                        </span>
                      </div>

                      {/* Edit task button. */}
                      <button
                        type="button"
                        className="edit-task-button"
                        onClick={() =>
                          handleEditTask(task)
                        }
                      >
                        Edit
                      </button>
                    </div>
                  </article>
                ))
              ) : (
                <p className="empty-task-message">
                  No tasks
                </p>
              )}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

export default ProjectDetails;
