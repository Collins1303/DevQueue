package com.devqueue.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "projects")
public class Project {

    // Unique identifier for each project.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Project name.
    @Column(nullable = false)
    private String name;

    // Optional description of the project.
    @Column(columnDefinition = "TEXT")
    private String description;

    // Current status of the project.
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProjectStatus status;

    // Date when the project begins.
    private LocalDate startDate;

    // Deadline for completing the project.
    private LocalDate dueDate;

    // Organization that owns this project.
    // Many projects can belong to one organization.
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "organization_id", nullable = false)
    private Organization organization;

    // Date and time when the project was created.
    @Column(nullable = false)
    private LocalDateTime createdAt;

    // Empty constructor required by JPA.
    public Project() {
    }

    // Returns the project ID.
    public Long getId() {
        return id;
    }

    // Sets the project ID.
    public void setId(Long id) {
        this.id = id;
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

    // Returns the organization that owns the project.
    public Organization getOrganization() {
        return organization;
    }

    // Sets the organization that owns the project.
    public void setOrganization(Organization organization) {
        this.organization = organization;
    }

    // Returns the project creation date.
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    // Sets the project creation date.
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    // Automatically sets the creation date and default status.
    @PrePersist
    protected void onCreate() {

        // Set the creation date when the project is first saved.
        createdAt = LocalDateTime.now();

        // Give new projects the PLANNING status by default.
        if (status == null) {
            status = ProjectStatus.PLANNING;
        }
    }
}