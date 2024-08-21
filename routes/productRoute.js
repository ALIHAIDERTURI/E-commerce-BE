const express = require('express')

const productRoute = express.Router()

productRoute.route('getProduct').get()
productRoute.route('createProduct').post()
productRoute.route('updateProduct').put()
productRoute.route('deleteProduct').delete()

module.exports = productRoute
