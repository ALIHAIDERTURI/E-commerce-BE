// File: routes/adminRoutes.js
const express = require('express');
const { protect } = require('../middleware/protectAuthMiddleware'); // Import your protect middleware
const { restrictTo } = require('../middleware/adminAuthMiddleware'); // Import your admin middleware
// const {
//     getUserById,
//     getAllUsers
// } = require('../controllers/userController');

const adminRoute = express.Router();

// Admin routes
// adminRoute.route('/getUser/:id').get(protect, restrictTo, );
// adminRoute.route('/getAllUsers').get(protect, restrictTo, );

module.exports = adminRoute;
