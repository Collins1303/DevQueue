/*
 * DevQueue API Configuration
 *
 * This file contains functions used by the React frontend
 * to communicate with the Spring Boot backend.
 */

// Base URL of the Spring Boot API.
export const API_BASE_URL = "http://localhost:8080/api";

/*
 * =========================================================
 * PROJECT API FUNCTIONS
 * =========================================================
 */

/*
 * Get all projects from the Spring Boot backend.
 *
 * Backend endpoint:
 * GET /api/projects
 */
export async function getProjects() {
  // Send a GET request to Spring Boot.
  const response = await fetch(`${API_BASE_URL}/projects`);

  // If Spring Boot returns an error, stop here.
  if (!response.ok) {
    throw new Error("Failed to load projects.");
  }

  // Convert the JSON response into JavaScript data.
  return await response.json();
}


/*
 * Create a new project.
 *
 * Backend endpoint:
 * POST /api/projects
 */
export async function createProject(projectData) {
  // Send the project information to Spring Boot.
  const response = await fetch(`${API_BASE_URL}/projects`, {
    method: "POST",

    // Tell Spring Boot that we are sending JSON.
    headers: {
      "Content-Type": "application/json",
    },

    // Convert the JavaScript object into JSON.
    body: JSON.stringify(projectData),
  });

  // Stop if Spring Boot returns an error.
  if (!response.ok) {
    throw new Error("Failed to create project.");
  }

  // Return the newly created project.
  return await response.json();
}


/*
 * Get one project by its ID.
 *
 * Backend endpoint:
 * GET /api/projects/{projectId}
 */
export async function getProjectById(projectId) {
  // Send a GET request for the selected project.
  const response = await fetch(
    `${API_BASE_URL}/projects/${projectId}`
  );

  // Stop if Spring Boot returns an error.
  if (!response.ok) {
    throw new Error("Failed to load project.");
  }

  // Return the project as JavaScript data.
  return await response.json();
}

/*
 * =========================================================
 * TASK API FUNCTIONS
 * =========================================================
 */

/*
 * Get all tasks belonging to a project.
 *
 * Backend endpoint:
 * GET /api/tasks/project/{projectId}
 */
export async function getTasksByProject(projectId) {
  // Send a GET request for the project's tasks.
  const response = await fetch(
    `${API_BASE_URL}/tasks/project/${projectId}`
  );

  // Stop if Spring Boot returns an error.
  if (!response.ok) {
    throw new Error("Failed to load project tasks.");
  }

  // Return the tasks as JavaScript data.
  return await response.json();
}

/*
 * Create a new task.
 *
 * Backend endpoint:
 * POST /api/tasks
 */
export async function createTask(taskData) {
  // Send the task information to Spring Boot.
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: "POST",

    // Tell Spring Boot that we are sending JSON.
    headers: {
      "Content-Type": "application/json",
    },

    // Convert the JavaScript object into JSON.
    body: JSON.stringify(taskData),
  });

  // Stop if Spring Boot returns an error.
  if (!response.ok) {
    throw new Error("Failed to create task.");
  }

  // Return the newly created task.
  return await response.json();
}

/*
 * Get one task by its ID.
 *
 * Backend endpoint:
 * GET /api/tasks/{taskId}
 */
export async function getTaskById(taskId) {
  // Send a GET request for the selected task.
  const response = await fetch(
    `${API_BASE_URL}/tasks/${taskId}`
  );

  // Stop if Spring Boot returns an error.
  if (!response.ok) {
    throw new Error("Failed to load task.");
  }

  // Return the task as JavaScript data.
  return await response.json();
}

/*
 * Update an existing task.
 *
 * Backend endpoint:
 * PUT /api/tasks/{taskId}
 */
export async function updateTask(taskId, taskData) {
  // Send the updated task information to Spring Boot.
  const response = await fetch(
    `${API_BASE_URL}/tasks/${taskId}`,
    {
      method: "PUT",

      // Tell Spring Boot that we are sending JSON.
      headers: {
        "Content-Type": "application/json",
      },

      // Convert the JavaScript object into JSON.
      body: JSON.stringify(taskData),
    }
  );

  // Stop if Spring Boot returns an error.
  if (!response.ok) {
    throw new Error("Failed to update task.");
  }

  // Return the updated task.
  return await response.json();
}

/*
 * Delete an existing task.
 *
 * Backend endpoint:
 * DELETE /api/tasks/{taskId}
 */
export async function deleteTask(taskId) {
  // Send the DELETE request to Spring Boot.
  const response = await fetch(
    `${API_BASE_URL}/tasks/${taskId}`,
    {
      method: "DELETE",
    }
  );

  // Stop if Spring Boot returns an error.
  if (!response.ok) {
    throw new Error("Failed to delete task.");
  }

  // The backend returns HTTP 204 with no JSON body.
  return true;
}
