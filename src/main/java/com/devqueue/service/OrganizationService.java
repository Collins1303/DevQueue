package com.devqueue.service;

import com.devqueue.entity.Organization;
import com.devqueue.repository.OrganizationRepository;
import org.springframework.stereotype.Service;

@Service
public class OrganizationService {

    // Repository used to communicate with the organizations table.
    private final OrganizationRepository organizationRepository;

    // Constructor injection provides the repository.
    public OrganizationService(OrganizationRepository organizationRepository) {
        this.organizationRepository = organizationRepository;
    }

    // Creates a new organization.
    public Organization createOrganization(Organization organization) {

        // Prevent duplicate organization names.
        if (organizationRepository.existsByName(organization.getName())) {
            throw new IllegalArgumentException(
                    "Organization name already exists"
            );
        }

        // Save the organization to MySQL.
        return organizationRepository.save(organization);
    }
}