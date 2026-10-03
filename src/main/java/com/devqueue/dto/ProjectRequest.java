package com.devqueue.dto;

import com.devqueue.entity.ProjectStatus;

import java.time.LocalDate;

// Contains the information required to create a project.
public class ProjectRequest {

    // Name of the project.
    private String name;

    // Description of the project.
    private String description;

    // Status of the project.
    private ProjectStatus status;

    // Date when the project starts.
    private LocalDate startDate;

    // Deadline for the project.
    private LocalDate dueDate;

    // ID of the organization that owns the project.
    private Long organizationId;

    // Empty constructor used by Spring to read JSON.
    public ProjectRequest() {
    }

    // Returns the project name.
    public String getName() {
        return name;
    }

    // Sets the project name.
    public void setName(String name) {
        this.name = name;
    }

    // Returns the project description.
    public String getDescription() {
        return description;
    }

    // Sets the project description.
    public void setDescription(String description) {
        this.description = description;
    }

    // Returns the project status.
    public ProjectStatus getStatus() {
        return status;
    }

    // Sets the project status.
    public void setStatus(ProjectStatus status) {
        this.status = status;
    }

    // Returns the project start date.
    public LocalDate getStartDate() {
        return startDate;
    }

    // Sets the project start date.
    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    // Returns the project due date.
    public LocalDate getDueDate() {
        return dueDate;
    }

    // Sets the project due date.
    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    // Returns the organization ID.
    public Long getOrganizationId() {
        return organizationId;
    }

    // Sets the organization ID.
    public void setOrganizationId(Long organizationId) {
        this.organizationId = organizationId;
    }
}