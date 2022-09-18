const express = require('express')
const productControllers = require('../controllers/products.controller')

const router = express.Router()

router
.route('/bulk-update')
.patch(productControllers.bulkUpdateAProduct)

router
.route('/bulk-delete')
.delete(productControllers.bulkDeleteAProduct)

router
.route('/')
.get(productControllers.getProduct)
.post(productControllers.saveProduct)


router
.route('/:id')
.patch(productControllers.updateAProduct)
.delete(productControllers.deleteAProduct)


module.exports = router