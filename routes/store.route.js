const express =  require('express');
const { get } = require('mongoose');
const storeControllers = require('../controllers/store.controller');

const router = express.Router();

router
.route('/')
.get(storeControllers.getStore)
.post(storeControllers.createStore)

router
.route('/:id')
.get(storeControllers.getAStoreById)

module.exports = router;