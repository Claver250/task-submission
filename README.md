# Task Submission Management API
A RESTful API for managing task submissions with JWT authentication

## Features
- JWT-based authentication and authorization
- CRUD operations for tasks and submissions
- User management with different tracks
- Submission status tracking ('submitted', 'under review', 'approved', 'changes requested', 'rejected')
- Input validation and comprehensive error handling
- Unit tests for all end points
- Complete API documentation

## Tech Stack
- Runtime: Node.js
- Framework: Express.js
- Database: PostgreSQL
<<<<<<< HEAD
- Authentication: JWT
=======
- Authenticcation: JWT
>>>>>>> 49e514692e8a239b55f450796686ccbd3e05c807
- Validation: Joi
- Testing: Postman

## Installation
### 1. Clone the Repository
```bash
<<<<<<< HEAD
git clone https://github.com/Claver250/task-submission
=======
git clone https://github.com/yourusername/internship-task-submission.git
>>>>>>> 49e514692e8a239b55f450796686ccbd3e05c807
cd internship-task-submission
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Environmental Configuration(.env)
PORT=4187
DB_NAME=submission_db
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_HOST=localhost
JWT_SECRET=your_super_secret_key

### 4. Run the Server
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

## API Documentation
### Base URL
https://localhost:4187/api
### Authentication
Method,Endpoint,Description
POST,/auth/register,Register a new user
POST,/auth/login,Login and receive JWT
### Tasks
Method,Endpoint,Description,Auth
GET,/tasks,Get all tasks,User
POST,/tasks,Create a task,Admin
GET,/tasks/:id,Get specific task,User
### Submissions
Method,Endpoint,Description,Auth
POST,/submissions,Create a task,Admin
GET,/submissions,Get all submissions,User & Admin
POST,/submissions,Submit a task link,User
PATCH,/submissions/:id,Update status,Admin
DELETE,/submissions/:id,Delete submission/User

## Sample Requests & Responses
### 1. User Registration
Request:
```
{
  "name": "Claver",
  "email": "claver@example.com",
  "password": "SecurePassword123!",
  "track": "BACKEND-DEV"
}
```
Response:
```
{
    "message": "User registered successfully",
    "user": {
        "id": "779d4349-d631-4b98-8447-6fb06efb9d78",
        "name": "Claver",
        "email": "claver@example.com",
        "track": "BACKEND-DEV"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU2ZmU1OTIzLTYyMDMtNDdkYS1hYjZjLWMwZWFiNTA1NjRkZiIsImVtYWlsIjoiamFuZUBleGFtcGxlLmNvbSIsInRyYWNrIjoiUFJPRFVDVC1ERVNJR04iLCJpYXQiOjE3Njg5OTQ1MjAsImV4cCI6MTc2OTA4MDkyMH0.-TJ9dRD2N4sp_3fO-948RYTQITWxlLFwduSmfDXOv8o"
}
```
### 2. User Login
Request:
```
{
  "email": "claver@example.com",
  "password": "SecurePassword123!"
}
```
Response:
```
{
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc3OWQ0MzQ5LWQ2MzEtNGI5OC04NDQ3LTZmYjA2ZWZiOWQ3OCIsImVtYWlsIjoiY2xhdmVyQGV4YW1wbGUuY29tIiwiaWF0IjoxNzY4OTI4ODg5LCJleHAiOjE3NjkwMTUyODl9.qEx3vpZFWgA5bjvj2io0Br-SNZCWPvrvC1QLzWfrigw"
}
```
### 3. Create Task
Request:
```
{
    "title": "Build a Simple Internship Task Submission API",
    "description": "Create a RESTful API for managing internship task submissions and teacking",
    "deadline": "2026-01-24T23:59:00+01:00",
    "track": "BACKEND-DEV",
    "requirements": "Technology Stack, API Endpoints, Database Schema, Requirements, Deliverables"
}
```
Response:
```
{
    "message": "Task created successfully",
    "data": {
        "id": "f1cce515-8ff9-4f28-b08b-f79e774dc5d8",
        "title": "Build a Simple Internship Task Submission API",
        "description": "Create a RESTful API for managing internship task submissions and teacking",
        "deadline": "2026-01-24T22:59:00.000Z",
        "track": "BACKEND-DEV",
        "requirements": "Technology Stack, API Endpoints, Database Schema, Requirements, Deliverables",
        "updatedAt": "2026-01-20 15:24:12.697+01",
        "createdAt": "2026-01-20 15:24:12.697+01"
    }
}
```
### 4. Get All Tasks
Response:
```
{
    "message": "Tasks retrieved successfully",
    "data": [
        {
            "id": "402e8ffd-d4fd-4ac5-b5e0-760520b1c1da",
            "title": "Build a Simple Internship Task Submission API",
            "description": "Create a RESTful API for managing internship task submissions and teacking",
            "deadline": "2026-01-24T22:59:00.000Z",
            "track": "BACKEND-DEV",
            "requirements": "Technology Stack, API Endpoints, Database Schema, Requirements, Deliverables",
            "createdAt": "2026-01-20T14:24:12.697Z",
            "updatedAt": "2026-01-20T14:24:12.697Z"
        },
        {
            "id": "af3fdcac-8ab3-4319-a35a-8fe79c02fcf7",
            "title": "Design a User Dashboard Wireframe & Prototype",
            "description": "Design a responsive dashboard for UmmahSquare's internship progress, current stage, and tasks",
            "deadline": "2026-01-24T22:59:00.000Z",
            "track": "PRODUCT-DESIGN",
            "requirements": "Platform, Deliverable, Dashboard Home, Task Details, Profile Page",
            "createdAt": "2026-01-20T17:09:09.335Z",
            "updatedAt": "2026-01-20T17:09:09.335Z"
        }
    ]
}
```
### 5. Get User's Task
Response:
```
{
    "message": "Task retrieved successfully",
    "data": {
        "id": "402e8ffd-d4fd-4ac5-b5e0-760520b1c1da",
        "title": "Build a Simple Internship Task Submission API",
        "description": "Create a RESTful API for managing internship task submissions and teacking",
        "deadline": "2026-01-24T22:59:00.000Z",
        "track": "BACKEND-DEV",
        "requirements": "Technology Stack, API Endpoints, Database Schema, Requirements, Deliverables",
        "createdAt": "2026-01-20T14:24:12.697Z",
        "updatedAt": "2026-01-20T14:24:12.697Z"
    }
}
```
### 6. Create Submission Link
Request:
```
{
  "task_id": "402e8ffd-d4fd-4ac5-b5e0-760520b1c1da",
  "user_id": "779d4349-d631-4b98-8447-6fb06efb9d78",
  "submissionLink": "https://github.com/Claver250/task-submission-repo"
}
```
Response:
```
{
    "message": "Submission created successfully",
    "data": {
        "id": "37cf34c6-e2d3-42a6-accb-f1de9bb16831",
        "status": "submitted",
        "task_id": "402e8ffd-d4fd-4ac5-b5e0-760520b1c1da",
        "user_id": "779d4349-d631-4b98-8447-6fb06efb9d78",
        "submissionLink": "https://github.com/Claver250/task-submission-repo",
        "updatedAt": "2026-01-20T17:33:09.120Z",
        "createdAt": "2026-01-20T17:33:09.120Z"
    }
}
```
### 7. Get All Submissions
Response:
```
{
    "message": "Submissions retrieved successfully",
    "data": [
        {
            "id": "37cf34c6-e2d3-42a6-accb-f1de9bb16831",
            "task_id": "402e8ffd-d4fd-4ac5-b5e0-760520b1c1da",
            "user_id": "779d4349-d631-4b98-8447-6fb06efb9d78",
            "status": "submitted",
            "submissionLink": "https://github.com/Claver250/task-submission-repo",
            "createdAt": "2026-01-20T17:33:09.120Z",
            "updatedAt": "2026-01-20T17:48:07.221Z"
        }
    ]
}
```
### 8. Gat User's Submission
Response:
```
{
    "message": "Submission retrieved successfully",
    "data": {
        "id": "37cf34c6-e2d3-42a6-accb-f1de9bb16831",
        "task_id": "402e8ffd-d4fd-4ac5-b5e0-760520b1c1da",
        "user_id": "779d4349-d631-4b98-8447-6fb06efb9d78",
        "status": "submitted",
        "submissionLink": "https://github.com/Claver250/task-submission-repo",
        "createdAt": "2026-01-20T17:33:09.120Z",
        "updatedAt": "2026-01-20T17:33:09.120Z"
    }
}
```
### 9. Update User Submission Status
Request:
```
{
  "status": "approved"
}
```
Response:
```
{
    "message": "Submission status updated successfully",
    "data": {
        "id": "37cf34c6-e2d3-42a6-accb-f1de9bb16831",
        "task_id": "402e8ffd-d4fd-4ac5-b5e0-760520b1c1da",
        "user_id": "779d4349-d631-4b98-8447-6fb06efb9d78",
        "status": "approved",
        "submissionLink": "https://github.com/Claver250/task-submission-repo",
        "createdAt": "2026-01-20T17:33:09.120Z",
        "updatedAt": "2026-01-20T17:48:07.221Z"
    }
}
```
### 10. Delete User Submission
Response:
```
{
    "message": "Submission deleted successfully"
}
```
