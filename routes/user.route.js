const express = require('express')
const userControllers = require('../controllers/user.controllers')
const router = express.Router()

router
.route('/signup')
.post(userControllers.signup)

module.exports = router;