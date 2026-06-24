# Todo Backend API

A simple RESTful Todo API built using Node.js, Express.js, MongoDB, and Mongoose.

## Features
- Create a Todo
- Get all Todos
- Get a Todo by ID
- Update a Todo
- Delete a Todo
- MongoDB Integration
- Error Handling Middleware

## Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose

## Installation

```bash
git clone <repository-url>
cd todo_Backend
npm install
npm start
```

## Environment Variables

Create a `.env` file and add:

```env
MONGO_URI=your_mongodb_connection_string
PORT=3001
```

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/todos | Create Todo |
| GET | /api/todos | Get All Todos |
| GET | /api/todos/:id | Get Todo By ID |
| PUT | /api/todos/:id | Update Todo |
| DELETE | /api/todos/:id | Delete Todo |

