const jsonwebtoken = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const KEY = process.env.KEY; // Get the secret key from environment variables

module.exports = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(403).json({
            message: "No token provided"
        })
    }

    jsonwebtoken.veriify(token, KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Unauthorized access"
            })
        }
        req.user = decoded;
        next();
    });
};