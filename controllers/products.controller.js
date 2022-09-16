const { getProductServices, createProductServices } = require("../services/product.services")


exports.getProduct = async (req, res, next) => {
    try {
        const products = await getProductServices()
        res.status(200).json({
            status: 'success',
            data: products
        })
    }
    catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Data can't found"
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