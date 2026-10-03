# DevQueue

## Project Title

# DevQueue - Development Team Task Management System

DevQueue is a web-based project and task management system designed to help software development teams organize projects, manage tasks, track progress, and collaborate more effectively.

---

## Description

Software development projects can become difficult to manage when tasks, deadlines, project information, and team responsibilities are scattered across different platforms.

DevQueue is being developed to provide a centralized platform where development teams can create projects, create and manage tasks, assign tasks to team members, track task status, and monitor overall project progress.

The system consists of a React frontend, a Spring Boot backend, and a MySQL database.

The goal of DevQueue is to make project and task management simpler and more organized for development teams.

---

## Features

### Project Management

* Create new projects.
* View all projects.
* Search projects by name or description.
* View individual project details.
* View project descriptions and status.
* View project start dates and due dates.
* Connect projects to organizations.
* Calculate project progress based on completed tasks.

### Task Management

* Create tasks inside projects.
* View tasks belonging to a project.
* Organize tasks by status.
* Set task priority.
* Set task due dates.
* Assign tasks to users.
* Edit existing tasks.
* Update task status.
* Update task priority.
* Update task descriptions and deadlines.

### Task Board

Tasks are organized into different sections:

* TODO
* IN PROGRESS
* REVIEW
* DONE

The project details page also displays:

* Total number of tasks.
* Number of completed tasks.
* Number of tasks currently in progress.
* Project completion percentage.

### Backend API

The Spring Boot backend provides REST API endpoints for:

* Authentication
* Organizations
* Projects
* Tasks

The React frontend communicates with the Spring Boot backend using HTTP requests.

---

## Technology Stack

### Frontend

* React
* JavaScript
* Vite
* HTML
* CSS
* React Router
* Fetch API

### Backend

* Java
* Spring Boot
* Spring Web
* Spring Data JPA
* Spring Security

### Database

* MySQL
* MySQL Workbench

### Development Tools

* Git
* GitHub
* Maven
* Node.js
* npm
* Notepad++

---

## Project Structure

The project is divided into two main applications:

```text
DevQueue
│
├── frontend
│   ├── src
│   │   ├── api
│   │   │   └── api.js
│   │   │
│   │   ├── pages
│   │   │   ├── Projects.jsx
│   │   │   └── ProjectDetails.jsx
│   │   │
│   │   └── ...
│   │
│   ├── package.json
│   └── ...
│ ├── src
│ │   └── main
│ │       └── java
│ │           └── com.devqueue
│ │
│ └── ...
│
│
└── README.md
```

---

# How to Run

## Prerequisites

Before running DevQueue, make sure the following are installed:

* Java JDK
* Maven
* Node.js
* npm
* MySQL
* MySQL Workbench
* Git

---

## 1. Start MySQL

Make sure your MySQL server is running.

The DevQueue Spring Boot backend connects to the MySQL database configured in the application's configuration file.

---

## 2. Start the Spring Boot Backend

Open a terminal inside the backend project folder.

Run:

```bash
mvn spring-boot:run
```

The backend normally runs on:

```text
http://localhost:8080
```

The REST API is available under:

```text
http://localhost:8080/api
```

---

## 3. Start the React Frontend

Open another terminal inside the frontend folder.

Install the frontend dependencies if necessary:

```bash
npm install
```

Then start the React development server:

```bash
npm run dev
```

The frontend normally runs on:

```text
http://localhost:5173
```

---

## 4. Open DevQueue

Open the frontend address in a browser:

```text
http://localhost:5173
```

Make sure both the Spring Boot backend and React frontend are running at the same time.

---

# Current API Endpoints

## Projects

### Create Project

```text
POST /api/projects
```

### Get All Projects

```text
GET /api/projects
```

### Get Projects by Organization

```text
GET /api/projects/organization/{organizationId}
```

### Get Project by ID

```text
GET /api/projects/{projectId}
```

---

## Tasks

### Create Task

```text
POST /api/tasks
```

### Get All Tasks

```text
GET /api/tasks
```

### Get Tasks for a Project

```text
GET /api/tasks/project/{projectId}
```

### Get Task by ID

```text
GET /api/tasks/{taskId}
```

### Update Task

```text
PUT /api/tasks/{taskId}
```

### Delete Task

```text
DELETE /api/tasks/{taskId}
```

---

# Development Status

DevQueue is currently under active development.

The current version has successfully connected the React frontend to the Spring Boot backend and MySQL database.

The following functionality has been implemented:

* React frontend
* Spring Boot backend
* MySQL database integration
* Project creation
* Project retrieval
* Project details
* Project search
* Task creation
* Task retrieval
* Tasks grouped by project
* Task editing
* Task status management
* Task priority management
* Task assignment
* Task due dates
* Project task statistics
* Project progress calculation
* REST API communication
* CORS configuration

Additional features and improvements will be added as development continues.

---

# Future Improvements

Planned improvements include:

* User authentication and login
* User registration
* Team member management
* Better task assignment interface
* Project editing and deletion
* Task deletion from the frontend
* Dashboard statistics
* Improved project and task filtering
* Improved user interface
* Responsive design improvements
* Notifications
* Additional project management features

---

# Author

**Name: Chibuzor Collins Ilochi**

**GitHub:** https://github.com/Collins1303

**Email:** [collinsilochi20@gmail.com](mailto:collinsilochi20@gmail.com)

---

# License

This project is currently being developed as an educational/project portfolio application.
