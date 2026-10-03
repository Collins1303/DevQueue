package com.devqueue.controller;

import com.devqueue.dto.TaskRequest;
import com.devqueue.dto.TaskResponse;
import com.devqueue.dto.TaskUpdateRequest;
import com.devqueue.entity.Task;
import com.devqueue.service.TaskService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Exposes REST API endpoints for task management.
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    // Gives the controller access to task business logic.
    private final TaskService taskService;

    // Constructor injection provides TaskService.
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    // Creates a new task.
    @PostMapping
    public ResponseEntity<TaskResponse> createTask(
            @RequestBody TaskRequest request) {

        // Create and save the task through the service.
        Task createdTask = taskService.createTask(request);

        // Convert the entity into a safe response DTO.
        TaskResponse response = taskService.toResponse(createdTask);

        // Return the created task.
        return ResponseEntity.ok(response);
    }

    // Retrieves all tasks.
    @GetMapping
    public ResponseEntity<List<TaskResponse>> getAllTasks() {

        // Retrieve all tasks and convert them into response DTOs.
        List<TaskResponse> responses = taskService.getAllTasks()
                .stream()
                .map(taskService::toResponse)
                .toList();

        // Return the task list.
        return ResponseEntity.ok(responses);
    }

    // Retrieves tasks belonging to a specific project.
    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<TaskResponse>> getTasksByProject(
            @PathVariable Long projectId) {

        // Retrieve tasks belonging to the specified project.
        List<TaskResponse> responses = taskService
                .getTasksByProject(projectId)
                .stream()
                .map(taskService::toResponse)
                .toList();

        // Return the project's tasks.
        return ResponseEntity.ok(responses);
    }

    // Retrieves one task using its ID.
    @GetMapping("/{taskId}")
    public ResponseEntity<TaskResponse> getTaskById(
            @PathVariable Long taskId) {

        // Retrieve the task from the service.
        Task task = taskService.getTaskById(taskId);

        // Convert the task entity into a response DTO.
        TaskResponse response = taskService.toResponse(task);

        // Return the task response.
        return ResponseEntity.ok(response);
    }

    // Updates an existing task.
    @PutMapping("/{taskId}")
    public ResponseEntity<TaskResponse> updateTask(
            @PathVariable Long taskId,
            @RequestBody TaskUpdateRequest request) {

        // Send the update request to the service.
        Task updatedTask = taskService.updateTask(taskId, request);

        // Convert the updated entity into a response DTO.
        TaskResponse response = taskService.toResponse(updatedTask);

        // Return the updated task.
        return ResponseEntity.ok(response);
    }

    // Deletes an existing task.
    @DeleteMapping("/{taskId}")
    public ResponseEntity<Void> deleteTask(
            @PathVariable Long taskId) {

        // Send the task ID to the service for deletion.
        taskService.deleteTask(taskId);

        // Return HTTP 204 when the task is successfully deleted.
        return ResponseEntity.noContent().build();
    }
}