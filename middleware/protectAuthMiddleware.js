const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// exports.protect = async (req, res, next) => {
//     let token;

//     if (
//         req.headers.authorization &&
//         req.headers.authorization.startsWith('Bearer')
//     ) {
//         // Get token from header
//         token = req.headers.authorization.split(' ')[1];
//     }

//     // Ensure token exists
//     if (!token) {
//         return res.status(401).json({ success: false, error: "Not authorized to access this route" });
//     }

//     try {
//         // Verify token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         // Find the user by ID from token payload
//         req.user = await User.findById(decoded.id);

//         next();
//     } catch (err) {
//         return res.status(401).json({ success: false, error: "Not authorized to access this route" });
//     }
// };

// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');

exports.protect = async (req, res, next) => {
    let token;

    // Extract token from headers
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        // Get token from header
        token = req.headers.authorization.split(' ')[1];
    }

    // Ensure token exists
    if (!token) {
        return res.status(401).json({ success: false, error: "Not authorized to access this route" });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user by ID from token payload
        req.user = await User.findById(decoded.id);

        if (!req.user) {
            return res.status(401).json({ success: false, error: "User not found" });
        }

        next();
    } catch (err) {
        console.error("Token verification failed:", err); // Log the error for debugging
        return res.status(401).json({ success: false, error: "Not authorized to access this route" });
    }
};

