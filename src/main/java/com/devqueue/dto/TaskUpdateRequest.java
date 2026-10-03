package com.devqueue.dto;

import com.devqueue.entity.TaskPriority;
import com.devqueue.entity.TaskStatus;

import java.time.LocalDate;

// Contains the information that can be changed when updating a task.
public class TaskUpdateRequest {

    // Updated task title.
    private String title;

    // Updated task description.
    private String description;

    // Updated task status.
    private TaskStatus status;

    // Updated task priority.
    private TaskPriority priority;

    // Updated task deadline.
    private LocalDate dueDate;

    // ID of the user assigned to the task.
    private Long assignedToId;

    // Empty constructor used by Spring to read JSON.
    public TaskUpdateRequest() {
    }

    // Returns the task title.
    public String getTitle() {
        return title;
    }

    // Updates the task title.
    public void setTitle(String title) {
        this.title = title;
    }

    // Returns the task description.
    public String getDescription() {
        return description;
    }

    // Updates the task description.
    public void setDescription(String description) {
        this.description = description;
    }

    // Returns the task status.
    public TaskStatus getStatus() {
        return status;
    }

    // Updates the task status.
    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    // Returns the task priority.
    public TaskPriority getPriority() {
        return priority;
    }

    // Updates the task priority.
    public void setPriority(TaskPriority priority) {
        this.priority = priority;
    }

    // Returns the task due date.
    public LocalDate getDueDate() {
        return dueDate;
    }

    // Updates the task due date.
    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    // Returns the assigned user ID.
    public Long getAssignedToId() {
        return assignedToId;
    }

    // Updates the assigned user ID.
    public void setAssignedToId(Long assignedToId) {
        this.assignedToId = assignedToId;
    }
}