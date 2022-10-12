const express = require('express');
const mongoose = require('mongoose');
const Stock = require('../models/Stock')
const { ObjectId } = mongoose.Types.ObjectId;

exports.getStockServices = async (filters, queries) => {
    // const stocks = await Stock.find(filters)
    //     .skip(queries.skip)
    //     .limit(queries.limit)
    //     .select(queries.fields)
    //     .sort(queries.sortBy)

    const stocks = await Stock.aggregate([
        { $match: {} },
        {
            $project: {
                store:1,
                price:{ $convert: { input: '$price', to: 'int' } },
                quantity:1
            }
        },
        { $group: { _id: '$store.name', totalProductsPrice: { $sum: { $multiply: ['$price', '$quantity'] } } } }
    ])

    const total = await Stock.countDocuments(filters)
    const page = Math.ceil(total / queries.limit)
    return { totalStocks: total, pageCount: page, stocks };
}

exports.getStockByIdService = async (id) => {
    // const stock = await Stock.findOne({_id: id}).populate("store.id").populate('suppliedBy.id').populate('brand.id')
    const stock = await Stock.aggregate([
        // Stage1
        { $match: { _id: ObjectId(id) } },
        // {
        //     $project: {
        //         category: 1,
        //         quantity: 1,
        //         price: 1,
        //         name: 1,
        //         productId: 1,
        //         'brand.name': {$toLower: '$brand.name'}
        //     }
        // },
        // {
        //     $lookup: {
        //         from: 'brands',
        //         localField: 'brand.name',
        //         foreignField: 'name',
        //         as: 'brandDetails'
        //     }
        // }
    ])
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