// todoroutes.js
// Express router for todo-related endpoints
const express = require('express');
const todo = require('../controllers/todoController'); // Import todo controller functions
const authMid = require('../middleware/authMiddleware'); // Import authentication middleware

const router = express.Router(); // Create a new router instance

// Route to create a new todo (requires authentication)
router.post('/create', authMid, todo.createTodo);
// Route to get all todos for the user (requires authentication)
router.post('/get', authMid, todo.getTodos);
// Route to remove a todo by ID (requires authentication)
router.post('/remove/:id', authMid, todo.removeTodo);
// Route to update a todo by ID (requires authentication)
router.post('/update/:id', authMid, todo.updateTodo);

module.exports = router; // Export the router to be used in the main app
