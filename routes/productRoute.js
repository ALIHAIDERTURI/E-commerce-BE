const express = require('express')
const upload = require('../middleware/multerMiddleware.js')
const { protect } = require('../middleware/protectAuthMiddleware.js')
const { createProduct, deleteProduct, deleteProductBy_ID, updateProduct, getProductsByCategory, listProducts } = require('../controllers/productController.js')

const productRoute = express.Router()

productRoute.route('/getProduct').get(getProductsByCategory)
productRoute.route('/listProduct').get(listProducts)
productRoute.route('/createProduct').post(protect , upload.single('image') , createProduct)
productRoute.route('/updateProduct').put(protect, upload.single('image') ,updateProduct)
productRoute.route('/deleteProduct').delete(protect, deleteProduct )// passing ID in json body as { "id": "..."}
productRoute.route('/deleteProduct').delete(protect, deleteProductBy_ID ) //pass id in params
module.exports = productRoute
