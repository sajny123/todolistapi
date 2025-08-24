const mongoose = require('mongoose');
const jsonwebtoken = require('jsonwebtoken');
const dotenv = require('dotenv');  
const User = require('../models/userModel'); // Import the User model

dotenv.config(); // Load environment variables from .env file

const KEY = process.env.KEY; // Get the secret key from environment variables

exports.signup = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(500).json({
            message: "Username and password are required."
        })
    } else {
        try {
            const existingUser = await User.findOne( { username })
            if (existingUser) {
                return res.status(400).json({
                    message: "User already exists."
                })
            } else {
                const newUser = new User({ username, password});
                await newUser.save();
                
                const token = jsonwebtoken.sign({ id: newUser.id}, KEY);
                return res.status(200).json({
                    message: "User created successfully.",
                    token
                })
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "An error occurred while creating the user."
            })
        }
    }
}

exports.login = async (req, res) => {}
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(500).json ({
            message: "Username and password are required."
        })
    } else {
        try {
            const user = await User.findOne({ username});
            if (!user) {
                return res.status(404).json({
                    message: "User not found."
                })
            } else {
                const matched = user.comparePassword(password);
                if (!matched) {
                    return res.status(404).json({
                        message: "Invalid credentials."
                    })
                } else {
                const token = jsonwebtoken.sign({ id: user.id }, KEY);
                return res.status(200).json({
                    message: "Login successful.",
                    token,
                    user
                })
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error"
        })
    }
}