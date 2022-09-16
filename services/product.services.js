const Product = require('../models/Products.model')

exports.getProductServices = async() =>{
  const products =  await Product.find({})
  return products;
}

exports.createProductServices = async(data) => {
    const product = await await Product.create(data)
    return product
}