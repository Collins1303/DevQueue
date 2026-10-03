package com.devqueue.controller;

import com.devqueue.entity.Organization;
import com.devqueue.service.OrganizationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/organizations")
public class OrganizationController {

    // Gives the controller access to organization business logic.
    private final OrganizationService organizationService;

    // Constructor injection provides OrganizationService.
    public OrganizationController(OrganizationService organizationService) {
        this.organizationService = organizationService;
    }

    // Handles POST requests to create a new organization.
    @PostMapping
    public ResponseEntity<Organization> createOrganization(
            @RequestBody Organization organization) {

        // Send the organization to the service for processing.
        Organization createdOrganization =
                organizationService.createOrganization(organization);

        // Return the newly created organization.
        return ResponseEntity.ok(createdOrganization);
    }
}