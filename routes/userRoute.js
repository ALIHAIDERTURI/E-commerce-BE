const express = require('express')

const userRoute = express.Router()

userRoute.route('/getUser').get()
userRoute.route('/postUser').post()
userRoute.route('/updateUser').put()
userRoute.route('/deleteUser').delete()


module.exports = userRoute