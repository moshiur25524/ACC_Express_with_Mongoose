const express = require('express')
const productControllers = require('../controllers/products.controller')

const router = express.Router()

router
.route('/')
.get(productControllers.getProduct)
.post(productControllers.saveProduct)

module.exports = router