const Product = require("../models/Products.model")
const { getProductServices, createProductServices, updateProductService, bulkUpdateProductService, deleteAProductService, bulkDeleteProductService } = require("../services/product.services")


exports.getProduct = async (req, res, next) => {
  try {

    // price: {$gt: 500}
    console.log(req.query);
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

    if(req.query.page){

      const {page=1, limit=10} = req.query;

      const skip = (page - 1)*parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit)
    }

    const products = await getProductServices(filters, queries)

    res.status(200).json({
      status: 'success',
      data: products
    })
  }
  catch (error) {
    res.status(400).json({
      status: 'fail',
      message: "Data can't found 😭"
    })
  }
}

exports.saveProduct = async (req, res, next) => {

  try {
    // Save / Create
    /*_________________________________*/

    // const product = new Product(req.body);

    // // instance creation => do something => save()

    // if(product.quantity == 0){
    //   product.status = 'out-of-stock'
    // }

    const result = await createProductServices(req.body)

    result.logger()
    // const product = new Product(req.body)

    // const result = await product.save()

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

exports.updateAProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateProductService(id, req.body)
    // result.logger()

    res.status(200).json({
      status: 'success',
      message: 'Product Successfully updated',
      // data: result
    })
  }
  catch (error) {
    res.status(400).json({
      status: 'fail',
      message: "couldn't update the product",
      error: error.message
    })
  }
}

exports.bulkUpdateAProduct = async (req, res, next) => {
  try {
    const result = await bulkUpdateProductService(req.body)

    res.status(200).json({
      status: 'success',
      message: 'Product Successfully Bulk updated 😃',
    })

  }
  catch (error) {
    res.status(400).json({
      status: 'fail',
      message: "couldn't bulk update the product 😞",
      error: error.message
    })
  }
}

exports.bulkDeleteAProduct = async (req, res, next) => {
  try {
    const result = await bulkDeleteProductService(req.body.ids)
    // console.log(result);

    if (!result.deletedCount) {
      return res.status(400).json({
        status: 'fail',
        error: 'The Product donnot found '
      })
    }

    res.status(200).json({
      status: 'success',
      message: 'Product Successfully Bulk delete products 😍',

    })
  }
  catch (error) {
    res.status(400).json({
      status: 'fail',
      message: "couldn't bulk delete the products 😭",
      error: error.message
    })
  }
}

exports.deleteAProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteAProductService(id)

    if (!result.deletedCount) {
      return res.status(400).json({
        status: 'fail',
        error: 'The Product cannot found what You want to delete 🥺'
      })
    }

    res.status(200).json({
      status: 'Success',
      message: "Product successfully Delted ❤️",
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

exports.fileUpload = async(req, res) =>{
  try{
    res.status(200).json(req.file)
  }
  catch(error){
  res.status(400).json({
    status: 'fail',
    message: 'The Product file upload is failed',
    error: error.message
  })
  }
}