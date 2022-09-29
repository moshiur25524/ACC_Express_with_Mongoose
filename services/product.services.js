const express = require('express');
const Product = require('../models/Products.model')

exports.getProductServices = async(filters, queries) =>{
  const products =  await Product.find(filters)
  .skip(queries.skip)
  .limit(queries.limit)
  .select(queries.fields)
  .sort(queries.sortBy)
  const totalProducts =await Product.countDocuments(filters)
  const pageCount = Math.ceil(totalProducts/queries.limit)
  return {totalProducts,pageCount,products};
}

exports.createProductServices = async(data) => {
    const product = await await Product.create(data)
    return product
}

exports.updateProductService = async(productId, data) =>{
  const result = Product.updateOne({_id: productId}, {$inc: data}, {runValidators: true})

  // const product = await Product.findById(productId);
  // const result = await product.set(data).save()
  return result
}

exports.bulkUpdateProductService = async(data) =>{

  // const result = await Product.updateMany({_id: data.ids}, data.data, {
  //   runValidators: true
  // });

  const products = [];

  data.ids.forEach(product =>{
    products.push(Product.updateOne({_id: product.id}, product.data))
  })
  const result = await Promise.all(products)
  // console.log(result);

  return result
}

exports.bulkDeleteProductService = async(ids) =>{

  const result = await Product.deleteMany({_id: ids})

  return result
}

exports.deleteAProductService = async(id) =>{
  const result = Product.deleteOne({_id: id})
  return result
}