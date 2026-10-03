package com.devqueue.dto;

import com.devqueue.entity.ProjectStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;

// Defines the safe information returned for a project.
public class ProjectResponse {

    // Project database ID.
    private Long id;

    // Project name.
    private String name;

    // Project description.
    private String description;

    // Current project status.
    private ProjectStatus status;

    // Project start date.
    private LocalDate startDate;

    // Project deadline.
    private LocalDate dueDate;

    // ID of the organization that owns the project.
    private Long organizationId;

    // Date and time the project was created.
    private LocalDateTime createdAt;

    // Empty constructor.
    public ProjectResponse() {
    }

    // Constructor used to create a response from a Project entity.
    public ProjectResponse(Long id, String name, String description,
                           ProjectStatus status, LocalDate startDate,
                           LocalDate dueDate, Long organizationId,
                           LocalDateTime createdAt) {

        this.id = id;
        this.name = name;
        this.description = description;
        this.status = status;
        this.startDate = startDate;
        this.dueDate = dueDate;
        this.organizationId = organizationId;
        this.createdAt = createdAt;
    }

    // Returns the project ID.
    public Long getId() {
        return id;
    }

    // Returns the project name.
    public String getName() {
        return name;
    }

    // Returns the project description.
    public String getDescription() {
        return description;
    }

    // Returns the project status.
    public ProjectStatus getStatus() {
        return status;
    }

    // Returns the start date.
    public LocalDate getStartDate() {
        return startDate;
    }

    // Returns the due date.
    public LocalDate getDueDate() {
        return dueDate;
    }

    // Returns the organization ID.
    public Long getOrganizationId() {
        return organizationId;
    }

    // Returns the creation date.
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}