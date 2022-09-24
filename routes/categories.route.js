const express = require('express')
const categoryControllers = require('../controllers/categories.controllers')

const router = express.Router()

router
.route('/')
.get(categoryControllers.getCategories)
.post(categoryControllers.createACategory)

router
.route('/:id')
.get(categoryControllers.getACategory)

module.exports = router