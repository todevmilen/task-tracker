# Task Tracker CLI Application

https://roadmap.sh/projects/task-tracker

This project is a CLI tool built with TypeScript and GTS (Google TypeScript Style). Follow the steps below to set up the project and start working on it.

Prerequisites Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/) (v14 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher)

### Setup

---

Follow these steps to set up the project on your local machine.

### 1. Clone the repository

```bash
git clone https://github.com/todevmilen/task-tracker
```

### 2. Install Dependencies

Install all the necessary dependencies using npm:

```bash
npm install
```

### 3. Compile the TypeScript Code

To compile the TypeScript code into JavaScript:

```bash
npm run compile
```

Project Functionalities Requirements:

- Add, Update, and Delete tasks
- Mark a task as in progress or done
- List all tasks
- List all tasks that are done
- List all tasks that are not done
- List all tasks that are in progress

Example Inputs

```
# Adding a new task - READY
task-cli add "Buy groceries"
# Output: Task added successfully (ID: 1)

# Updating and deleting tasks - READY
task-cli update 1 "Buy groceries and cook dinner"
task-cli delete 1

# Marking a task as in progress or done - READY
task-cli mark-in-progress 1
task-cli mark-done 1

# Listing all tasks READY
task-cli list

# Listing tasks by status
task-cli list done
task-cli list todo
task-cli list in-progress
```

### Task Properties

Each task should have the following properties:

- `id`: A unique identifier for the task
- `description`: A short description of the task
- `status`: The status of the task (`todo`, `in-progress`, `done`)
- `createdAt`: The date and time when the task was created
- `updatedAt`: The date and time when the task was last updated
