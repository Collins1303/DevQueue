package com.devqueue.service;

import com.devqueue.dto.ProjectRequest;
import com.devqueue.entity.Organization;
import com.devqueue.entity.Project;
import com.devqueue.repository.OrganizationRepository;
import com.devqueue.repository.ProjectRepository;
import org.springframework.stereotype.Service;

// DTO returned to the frontend.
import com.devqueue.dto.ProjectResponse;

import java.util.List;

// Contains the business logic for managing projects.
@Service
public class ProjectService {

    // Repository used to save and retrieve projects.
    private final ProjectRepository projectRepository;

    // Repository used to find the organization linked to a project.
    private final OrganizationRepository organizationRepository;

    // Constructor injection provides both repositories.
    public ProjectService(ProjectRepository projectRepository,
                          OrganizationRepository organizationRepository) {

        this.projectRepository = projectRepository;
        this.organizationRepository = organizationRepository;
    }

    // Creates a new project.
    public Project createProject(ProjectRequest request) {

        // Find the organization using the ID supplied in the request.
        Organization organization = organizationRepository
                .findById(request.getOrganizationId())
                .orElseThrow(() ->
                        new IllegalArgumentException("Organization not found"));

        // Create a new Project entity.
        Project project = new Project();

        // Copy the request information into the project.
        project.setName(request.getName());
        project.setDescription(request.getDescription());
        project.setStatus(request.getStatus());
        project.setStartDate(request.getStartDate());
        project.setDueDate(request.getDueDate());

        // Connect the project to its organization.
        project.setOrganization(organization);

        // Save the project in MySQL.
        return projectRepository.save(project);
    }

    // Retrieves every project in the database.
    public List<Project> getAllProjects() {

        // Return all saved projects.
        return projectRepository.findAll();
    }

    // Retrieves one project using its database ID.
    public Project getProjectById(Long projectId) {

        // Search for the project using the supplied ID.
        return projectRepository.findById(projectId)
                .orElseThrow(() ->
                        new IllegalArgumentException("Project not found"));
    }

    // Retrieves projects belonging to one organization.
    public List<Project> getProjectsByOrganization(Long organizationId) {

        // Return projects matching the organization ID.
        return projectRepository.findByOrganizationId(organizationId);
    }

    // Converts a Project entity into a safe ProjectResponse DTO.
    public ProjectResponse toResponse(Project project) {

        // Return project information without embedding the full Organization object.
        return new ProjectResponse(
                project.getId(),
                project.getName(),
                project.getDescription(),
                project.getStatus(),
                project.getStartDate(),
                project.getDueDate(),
                project.getOrganization().getId(),
                project.getCreatedAt()
        );
    }
}
