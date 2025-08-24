// userroutes.js
// Express router for user authentication endpoints
const express = require('express');
const auth = require('../controllers/userController'); // Import user controller functions

const router = express.Router(); // Create a new router instance

// Route for user signup (registration)
router.post('/signup', auth.signup);
// Route for user login (authentication)
router.post('/login', auth.login);

module.exports = router; // Export the router to be used in the main app