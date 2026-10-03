package com.devqueue.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "organizations")
public class Organization {

    // Unique ID for each organization.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Name of the organization/company.
    @Column(nullable = false)
    private String name;

    // Date and time when the organization was created.
    @Column(nullable = false)
    private LocalDateTime createdAt;

    // Empty constructor required by JPA.
    public Organization() {
    }

    // Returns the organization ID.
    public Long getId() {
        return id;
    }

    // Sets the organization ID.
    public void setId(Long id) {
        this.id = id;
    }

    // Returns the organization name.
    public String getName() {
        return name;
    }

    // Sets the organization name.
    public void setName(String name) {
        this.name = name;
    }

    // Returns the creation date.
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    // Sets the creation date.
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    // Automatically sets the creation date before saving.
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}