const express = require('express');
const Stock = require('../models/Stock')

exports.getStockServices = async (filters, queries) => {
    const stocks = await Stock.find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy)
    const total = await Stock.countDocuments(filters)
    const page = Math.ceil(total / queries.limit)
    return { totalStocks: total, pageCount: page, stocks };
}

exports.getStockByIdService = async(id) =>{
    const stock = await Stock.findOne({_id: id}).populate("store.id").populate('suppliedBy.id').populate('brand.id')
    return stock
}

exports.createStockServices = async (data) => {
    const stock = await await Stock.create(data)
    return stock
}

exports.updateStockService = async (productId, data) => {
    const result = Stock.updateOne({ _id: productId }, { $inc: data }, { runValidators: true })

    return result
}

exports.deleteAStockService = async (id) => {
    const result = Stock.deleteOne({ _id: id })
    return result
}