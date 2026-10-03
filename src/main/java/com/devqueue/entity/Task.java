package com.devqueue.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

// Represents a task belonging to a project.
@Entity
@Table(name = "tasks")
public class Task {

    // Unique identifier for each task.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Short title describing the task.
    @Column(nullable = false)
    private String title;

    // Detailed explanation of the task.
    @Column(columnDefinition = "TEXT")
    private String description;

    // Current status of the task.
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TaskStatus status;

    // Priority level of the task.
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TaskPriority priority;

    // Deadline for completing the task.
    private LocalDate dueDate;

    // Project to which this task belongs.
    // Many tasks can belong to one project.
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    // User assigned to work on the task.
    // This can remain empty until a user is assigned.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_to")
    private User assignedTo;

    // Date and time when the task was created.
    @Column(nullable = false)
    private LocalDateTime createdAt;

    // Date and time when the task was last updated.
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    // Empty constructor required by JPA.
    public Task() {
    }

    // Returns the task ID.
    public Long getId() {
        return id;
    }

    // Sets the task ID.
    public void setId(Long id) {
        this.id = id;
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

    // Returns the task due date.
    public LocalDate getDueDate() {
        return dueDate;
    }

    // Sets the task due date.
    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    // Returns the project connected to the task.
    public Project getProject() {
        return project;
    }

    // Sets the project connected to the task.
    public void setProject(Project project) {
        this.project = project;
    }

    // Returns the assigned user.
    public User getAssignedTo() {
        return assignedTo;
    }

    // Sets the assigned user.
    public void setAssignedTo(User assignedTo) {
        this.assignedTo = assignedTo;
    }

    // Returns the task creation date.
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    // Returns the task update date.
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    // Automatically sets default values before a task is saved.
    @PrePersist
    protected void onCreate() {

        // Set the creation and update timestamps.
        LocalDateTime now = LocalDateTime.now();

        createdAt = now;
        updatedAt = now;

        // Give new tasks a default status.
        if (status == null) {
            status = TaskStatus.TODO;
        }

        // Give new tasks a default priority.
        if (priority == null) {
            priority = TaskPriority.MEDIUM;
        }
    }

    // Automatically updates the timestamp before an existing task is updated.
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}