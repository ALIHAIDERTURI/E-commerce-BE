const express = require('express')
const {registerUser, loginUser} = require('../controllers/authController')

const authRoute = express.Router()


authRoute.route('/registerUser').post(registerUser)
authRoute.route('/loginUser').get(loginUser)

module.exports = authRoute