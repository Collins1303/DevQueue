package com.devqueue.controller;

import com.devqueue.dto.ProjectRequest;
import com.devqueue.dto.ProjectResponse;
import com.devqueue.entity.Project;
import com.devqueue.service.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Exposes REST API endpoints for project management.
@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    // Gives the controller access to project business logic.
    private final ProjectService projectService;

    // Constructor injection provides ProjectService.
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    // Creates a new project.
    @PostMapping
    public ResponseEntity<ProjectResponse> createProject(
            @RequestBody ProjectRequest request) {

        // Create and save the project through the service.
        Project createdProject = projectService.createProject(request);

        // Convert the entity into a safe response DTO.
        ProjectResponse response =
                projectService.toResponse(createdProject);

        // Return the project response.
        return ResponseEntity.ok(response);
    }

    // Retrieves all projects.
    @GetMapping
    public ResponseEntity<List<ProjectResponse>> getAllProjects() {

        // Retrieve all projects from the service.
        List<ProjectResponse> responses =
                projectService.getAllProjects()
                        .stream()
                        .map(projectService::toResponse)
                        .toList();

        // Return the list of project responses.
        return ResponseEntity.ok(responses);
    }

    // Retrieves one project using its ID.
    @GetMapping("/{projectId}")
    public ResponseEntity<ProjectResponse> getProjectById(
            @PathVariable Long projectId) {

        // Find the project using the ID from the URL.
        Project project = projectService.getProjectById(projectId);

        // Convert the project entity into a response DTO.
        ProjectResponse response =
                projectService.toResponse(project);

        // Return the project response.
        return ResponseEntity.ok(response);
    }

    // Retrieves projects belonging to a specific organization.
    @GetMapping("/organization/{organizationId}")
    public ResponseEntity<List<ProjectResponse>> getProjectsByOrganization(
            @PathVariable Long organizationId) {

        // Retrieve projects for the specified organization.
        List<ProjectResponse> responses =
                projectService.getProjectsByOrganization(organizationId)
                        .stream()
                        .map(projectService::toResponse)
                        .toList();

        // Return the organization's project responses.
        return ResponseEntity.ok(responses);
    }
}
