// dbconfig.js
// Database configuration and connection logic for MongoDB
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const URI = process.env.URI;

// Function to connect to MongoDB using the connection string from environment variables
const connect = async () => {
    try {
        await mongoose.connect(URI)
        console.log('Connected to Database');
    } catch (error) {
        console.log(error);
    }
}

module.exports = {connect, mongoose};
