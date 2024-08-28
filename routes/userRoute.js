const express = require('express')
// const upload = require('../middleware/multerMiddleware.js')
// const {} = require('../controllers/productController.js')
const { protect } = require('../middleware/protectAuthMiddleware.js')

const userRoute = express.Router()

userRoute.route('/getUser').get(protect, );  // Typically protected
userRoute.route('/postUser').post();        // Usually public for registration
userRoute.route('/updateUser').put(protect, ); // Protected for authenticated users
userRoute.route('/deleteUser').delete(protect, ); // Protected for authenticated users


module.exports = userRoute