const Store = require("../models/Store")

exports.getStoreService = async() =>{
    const stores = await Store.find({})
    return stores;
}

exports.getAStoreByIdService = async(id) =>{
    const store = await Store.findOne({_id: id})
    return store
}

exports.createStoreService = async(data) =>{
    const result = await Store.create(data)
    return result
}