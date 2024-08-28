const express = require('express')
const { createOrder, updateOrderStatus } = require('../controllers/orderController')
const { protect } = require('../middleware/protectAuthMiddleware')
const { restrictTo } = require('../middleware/adminAuthMiddleware')

const orderRoutes = express.Router()

// orderRoutes.route('getOrder').get()
orderRoutes.route('/createOrder').post(protect, createOrder)
orderRoutes.route('/updateOrderStatus/:id').put(protect, restrictTo('admin'), updateOrderStatus)

module.exports = orderRoutes