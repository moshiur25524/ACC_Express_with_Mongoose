const express =  require('express');
// const { get } = require('mongoose');
const stockControllers = require('../controllers/stock.controller');

const router = express.Router();

router
.route('/')
.get(stockControllers.getStock)
.post(stockControllers.saveStock)

router
.route('/:id')
.get(stockControllers.getStockById)
// .delete(stockControllers.deleteAStock)
// .patch(stockControllers.updateAStock)


module.exports = router;