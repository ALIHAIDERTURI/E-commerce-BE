const express = require('express')

const cartRoute = express.Router()

cartRoute.route('getCart').get()

module.exports = cartRoute