// const Stock = require("../models/Stock.model")
const Stock = require("../models/Stock");
const { getStockServices, createStockServices, updateStockService, deleteAStockService, getStockByIdService } = require("../services/stock.service");


exports.getStock = async (req, res, next) => {
  try {

    let filters = { ...req.query };

    // page, limit, sort --> exclude

    const excludeFields = ['page', 'limit', 'sort'];
    excludeFields.forEach(field => delete filters[field])

    let filtersString = JSON.stringify(filters)
    filtersString = filtersString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)

    filters = JSON.parse(filtersString)

    const queries = {};
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      queries.sortBy = sortBy
      console.log(sortBy);
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ')
      queries.fields = fields;
      console.log(fields);
    }

    if (req.query.page) {

      const { page = 1, limit = 10 } = req.query;

      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit)
    }

    const stocks = await getStockServices(filters, queries)

    res.status(200).json({
      status: 'success',
      data: stocks
    })
  }
  catch (error) {
    res.status(400).json({
      status: 'fail',
      message: "Data can't found 😭"
    })
  }
}

exports.getStockById = async(req, res) =>{
  try {
    const {id} = req.params;
    const stock = await getStockByIdService(id)

    if(!stock){
      return res.status(400).json({
        status: 'fail',
        message: 'Cannot get the stock with this Id 🥺',
        error: error.message
      })
    }

    res.status(200).json({
      status: 'success',
      data: stock
    })
  }
  catch (error) {
    res.status(400).json({
      status: 'fail',
      message: "Data can't found 😭"
    })
  }
}

exports.saveStock = async (req, res, next) => {

  try {

    const result = await createStockServices(req.body)

    result.logger()

    res.status(200).json({
      status: 'success',
      message: 'The Data is received successfully',
      data: result
    })
  }
  catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Data is not inserted',
      error: error.message
    })
  }
  // console.log(req.body);
}

exports.updateAStock = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateStockService(id, req.body)
    // result.logger()

    res.status(200).json({
      status: 'success',
      message: 'Stock Successfully updated',
      // data: result
    })
  }
  catch (error) {
    res.status(400).json({
      status: 'fail',
      message: "couldn't update the stock",
      error: error.message
    })
  }
}

exports.deleteAStock = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteAStockService(id)

    if (!result.deletedCount) {
      return res.status(400).json({
        status: 'fail',
        error: 'The Stock cannot found what You want to delete 🥺'
      })
    }

    res.status(200).json({
      status: 'Success',
      message: "Stock successfully Deleted ❤️",
      data: result
    })
  }
  catch (error) {
    res.status(400).json({
      status: "fail",
      message: "The Data isn't Deleted 😒",
      error: error.message
    })
  }
}

exports.fileUpload = async (req, res) => {
  try {
    res.status(200).json(req.files)
  }
  catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'The Product file upload is failed',
      error: error.message
    })
  }
}