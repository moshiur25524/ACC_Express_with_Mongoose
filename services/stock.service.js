const express = require('express');
const Stock = require('../models/Stock')

exports.getStockServices = async (filters, queries) => {
    const products = await Stock.find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy)
    const totalProducts = await Stock.countDocuments(filters)
    const pageCount = Math.ceil(totalProducts / queries.limit)
    return { totalProducts, pageCount, products };
}

exports.createStockServices = async (data) => {
    const product = await await Stock.create(data)
    return product
}

exports.updateStockService = async (productId, data) => {
    const result = Stock.updateOne({ _id: productId }, { $inc: data }, { runValidators: true })

    return result
}

exports.deleteAStockService = async (id) => {
    const result = Stock.deleteOne({ _id: id })
    return result
}