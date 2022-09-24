const express = require('express')
// const { route } = require('../app')
const brandControllers = require('../controllers/brand.controllers')

const router = express.Router()

router
.route('/')
.post(brandControllers.createBrand)
.get(brandControllers.getBrands)

router
.route('/:id')
.get(brandControllers.getABrand)
.patch(brandControllers.updateABrandById)

module.exports = router