package com.devqueue.dto;

import com.devqueue.entity.TaskPriority;
import com.devqueue.entity.TaskStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;

// Defines the task information returned by the API.
public class TaskResponse {

    // Task ID.
    private Long id;

    // Task title.
    private String title;

    // Task description.
    private String description;

    // Task status.
    private TaskStatus status;

    // Task priority.
    private TaskPriority priority;

    // Task deadline.
    private LocalDate dueDate;

    // ID of the connected project.
    private Long projectId;

    // ID of the assigned user, if available.
    private Long assignedToId;

    // Task creation date.
    private LocalDateTime createdAt;

    // Task update date.
    private LocalDateTime updatedAt;

    // Empty constructor.
    public TaskResponse() {
    }

    // Constructor used to create a response from a Task entity.
    public TaskResponse(Long id, String title, String description,
                        TaskStatus status, TaskPriority priority,
                        LocalDate dueDate, Long projectId,
                        Long assignedToId, LocalDateTime createdAt,
                        LocalDateTime updatedAt) {

        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.priority = priority;
        this.dueDate = dueDate;
        this.projectId = projectId;
        this.assignedToId = assignedToId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Returns the task ID.
    public Long getId() {
        return id;
    }

    // Returns the task title.
    public String getTitle() {
        return title;
    }

    // Returns the task description.
    public String getDescription() {
        return description;
    }

    // Returns the task status.
    public TaskStatus getStatus() {
        return status;
    }

    // Returns the task priority.
    public TaskPriority getPriority() {
        return priority;
    }

    // Returns the task deadline.
    public LocalDate getDueDate() {
        return dueDate;
    }

    // Returns the project ID.
    public Long getProjectId() {
        return projectId;
    }

    // Returns the assigned user ID.
    public Long getAssignedToId() {
        return assignedToId;
    }

    // Returns the task creation date.
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    // Returns the task update date.
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}