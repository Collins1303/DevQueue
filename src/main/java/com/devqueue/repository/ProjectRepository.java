package com.devqueue.repository;

import com.devqueue.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// Repository used for database operations involving projects.
public interface ProjectRepository extends JpaRepository<Project, Long> {

    // Finds all projects belonging to a specific organization.
    List<Project> findByOrganizationId(Long organizationId);
}