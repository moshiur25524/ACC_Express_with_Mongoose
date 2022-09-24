const Category = require('../models/Category')

exports.createCategoryService = async(data)=>{
    const result =  await Category.create( data)
    return result
}

exports.getCategoriesService = async()=>{
    const result =  await Category.find({})
    return result
}

exports.getACategoryService = async(id)=>{
    const result =  await Category.findOne({_id:id})
    return result
}