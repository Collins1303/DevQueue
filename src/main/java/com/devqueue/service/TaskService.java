package com.devqueue.service;

import com.devqueue.dto.TaskRequest;
import com.devqueue.dto.TaskResponse;
import com.devqueue.dto.TaskUpdateRequest;
import com.devqueue.entity.Project;
import com.devqueue.entity.Task;
import com.devqueue.entity.User;
import com.devqueue.repository.ProjectRepository;
import com.devqueue.repository.TaskRepository;
import com.devqueue.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

// Contains the business logic for managing tasks.
@Service
public class TaskService {

    // Repository used to save and retrieve tasks.
    private final TaskRepository taskRepository;

    // Repository used to find the project connected to a task.
    private final ProjectRepository projectRepository;

    // Repository used to find an assigned user.
    private final UserRepository userRepository;

    // Constructor injection provides the required repositories.
    public TaskService(TaskRepository taskRepository,
                       ProjectRepository projectRepository,
                       UserRepository userRepository) {

        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    // Creates a new task.
    public Task createTask(TaskRequest request) {

        // Find the project using the project ID.
        Project project = projectRepository
                .findById(request.getProjectId())
                .orElseThrow(() ->
                        new IllegalArgumentException("Project not found"));

        // Create a new Task entity.
        Task task = new Task();

        // Copy the request information into the task.
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus());
        task.setPriority(request.getPriority());
        task.setDueDate(request.getDueDate());

        // Connect the task to its project.
        task.setProject(project);

        // Assign a user only when an ID is provided.
        if (request.getAssignedToId() != null) {

            // Find the assigned user in the database.
            User assignedUser = userRepository
                    .findById(request.getAssignedToId())
                    .orElseThrow(() ->
                            new IllegalArgumentException("Assigned user not found"));

            // Connect the user to the task.
            task.setAssignedTo(assignedUser);
        }

        // Save the task in MySQL.
        return taskRepository.save(task);
    }

    // Retrieves all tasks.
    public List<Task> getAllTasks() {

        // Return every task from the database.
        return taskRepository.findAll();
    }

    // Retrieves tasks belonging to one project.
    public List<Task> getTasksByProject(Long projectId) {

        // Find tasks using the project ID.
        return taskRepository.findByProjectId(projectId);
    }

    // Converts a Task entity into a safe response DTO.
    public TaskResponse toResponse(Task task) {

        // Get the assigned user's ID, if a user is assigned.
        Long assignedToId = task.getAssignedTo() != null
                ? task.getAssignedTo().getId()
                : null;

        // Return task information without embedding full entities.
        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getStatus(),
                task.getPriority(),
                task.getDueDate(),
                task.getProject().getId(),
                assignedToId,
                task.getCreatedAt(),
                task.getUpdatedAt()
        );
    }
	// Retrieves one task using its database ID.
	public Task getTaskById(Long taskId) {

			// Search for the task and throw an error if it does not exist.
			return taskRepository.findById(taskId)
            .orElseThrow(() ->
                 new IllegalArgumentException("Task not found")
			);
	}
	// Updates the details of an existing task.
public Task updateTask(Long taskId, TaskUpdateRequest request) {

    // Find the existing task.
    Task task = taskRepository.findById(taskId)
            .orElseThrow(() ->
                    new IllegalArgumentException("Task not found"));

    // Update the task title.
    task.setTitle(request.getTitle());

    // Update the task description.
    task.setDescription(request.getDescription());

    // Update the task status.
    task.setStatus(request.getStatus());

    // Update the task priority.
    task.setPriority(request.getPriority());

    // Update the task deadline.
    task.setDueDate(request.getDueDate());

    // Handle the assigned user when an ID is supplied.
    if (request.getAssignedToId() != null) {

        // Find the new assigned user.
        User assignedUser = userRepository
                .findById(request.getAssignedToId())
                .orElseThrow(() ->
                        new IllegalArgumentException("Assigned user not found"));

        // Assign the user to the task.
        task.setAssignedTo(assignedUser);

    } else {

        // Remove the assignment when the ID is null.
        task.setAssignedTo(null);
    }

    // Save the updated task.
    return taskRepository.save(task);
}
// Deletes an existing task.
public void deleteTask(Long taskId) {

    // Check whether the task exists before deleting it.
    if (!taskRepository.existsById(taskId)) {
        throw new IllegalArgumentException("Task not found");
    }

    // Delete the task from the database.
    taskRepository.deleteById(taskId);
}
}