const express = require('express')

// needs to import Category controller 


const categoryRoute = express.Router()


categoryRoute.route('/getCategory').get()
categoryRoute.route('/createCategory').post()
categoryRoute.route('/updateCategory').put()
categoryRoute.route('/deleteCategory').delete()

module.exports = categoryRoute;