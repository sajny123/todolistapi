// server.js
// Entry point for the To Do List API server
const dotenv = require('dotenv'); // Loads environment variables from .env file
const app = require('./app'); // Imports the main Express app
const { connect } = require('./config/dbconfig'); // Imports the database connection function

app.use(express.json());
app.use('/api/v1/auth', userroutes);
app.use('/api/v1/todos', todoroutes);

dotenv.config(); // Initialize environment variables

// Get the port from environment variables or default to 3000
const PORT = process.env.PORT;

connect(); // Connect to the database

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});