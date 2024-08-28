const express = require('express')
const { createCategory, getCategories, updateCategory, deleteCategory } = require('../controllers/categoryController.js')
const { protect } = require('../middleware/protectAuthMiddleware')

// needs to import Category controller 


const categoryRoute = express.Router()


categoryRoute.route('/getCategory/').get(getCategories)
categoryRoute.route('/createCategory').post( createCategory)
categoryRoute.route('/updateCategory/id/:id').put(updateCategory)
categoryRoute.route('/updateCategory/name/:name').put(updateCategory)
categoryRoute.route('/deleteCategory').delete(deleteCategory)

module.exports = categoryRoute;