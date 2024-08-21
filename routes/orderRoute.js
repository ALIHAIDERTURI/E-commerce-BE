const express = require('express')

const orderRoutes = express.Router()

orderRoutes.route('getOrder').get()

module.exports = orderRoutes