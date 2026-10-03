package com.devqueue.dto;

import com.devqueue.entity.TaskPriority;
import com.devqueue.entity.TaskStatus;

import java.time.LocalDate;

// Contains the information required to create a task.
public class TaskRequest {

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

    // ID of the project containing the task.
    private Long projectId;

    // ID of the user assigned to the task.
    private Long assignedToId;

    // Empty constructor used by Spring to read JSON.
    public TaskRequest() {
    }

    // Returns the task title.
    public String getTitle() {
        return title;
    }

    // Sets the task title.
    public void setTitle(String title) {
        this.title = title;
    }

    // Returns the task description.
    public String getDescription() {
        return description;
    }

    // Sets the task description.
    public void setDescription(String description) {
        this.description = description;
    }

    // Returns the task status.
    public TaskStatus getStatus() {
        return status;
    }

    // Sets the task status.
    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    // Returns the task priority.
    public TaskPriority getPriority() {
        return priority;
    }

    // Sets the task priority.
    public void setPriority(TaskPriority priority) {
        this.priority = priority;
    }

    // Returns the task deadline.
    public LocalDate getDueDate() {
        return dueDate;
    }

    // Sets the task deadline.
    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    // Returns the project ID.
    public Long getProjectId() {
        return projectId;
    }

    // Sets the project ID.
    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    // Returns the assigned user ID.
    public Long getAssignedToId() {
        return assignedToId;
    }

    // Sets the assigned user ID.
    public void setAssignedToId(Long assignedToId) {
        this.assignedToId = assignedToId;
    }
}