package com.devqueue.repository;

import com.devqueue.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// Repository used for database operations involving tasks.
public interface TaskRepository extends JpaRepository<Task, Long> {

    // Finds all tasks belonging to a specific project.
    List<Task> findByProjectId(Long projectId);
}