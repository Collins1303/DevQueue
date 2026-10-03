package com.devqueue.entity;

// Defines the possible statuses of a task.
public enum TaskStatus {

    // Task has not started yet.
    TODO,

    // Task is currently being worked on.
    IN_PROGRESS,

    // Task is waiting for review.
    IN_REVIEW,

    // Task has been completed.
    DONE
}