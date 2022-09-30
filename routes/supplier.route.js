const express = require('express')
const suppliersControllers = require('../controllers/supplier.controller')
const router = express.Router()

router
.route('/')
.post(suppliersControllers.createSupplier)
.get(suppliersControllers.getSuppliers)

router
.route('/:id')
.get(suppliersControllers.getABrand)
.patch(suppliersControllers.updateABrandById)

module.exports = router