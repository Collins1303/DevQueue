package com.devqueue.repository;

import com.devqueue.entity.Organization;
import org.springframework.data.jpa.repository.JpaRepository;

// Repository responsible for database operations involving organizations.
public interface OrganizationRepository extends JpaRepository<Organization, Long> {

    // Checks whether an organization with this name already exists.
    boolean existsByName(String name);
}