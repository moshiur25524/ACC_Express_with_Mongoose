const express = require('express')
const userControllers = require('../controllers/user.controllers')
const verifyToken = require('../middleware/verifyToken')
const router = express.Router()

router
.post('/signup',userControllers.signup)

router
.post('/login', userControllers.login)

router.get('/me',verifyToken, userControllers.getMe)

module.exports = router;