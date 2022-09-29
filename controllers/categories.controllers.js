const { createCategoryService, getCategoriesService, getACategoryService } = require("../services/category.service")


exports.createACategory = async(req, res, next) =>{
    try{
        const result = await createCategoryService(req.body)
        res.status(200).json({
            status: 'Success',
            message: 'The Category Creation is successful',
            data: result
        })
    }
    catch(error){
        res.status(400).json({
            status: 'fail',
            message: 'category cannot be created',
            error: error.message
        })
    }
}

exports.getCategories = async(req, res, next) =>{
    try{
        const result = await getCategoriesService()
        res.status(200).json({
            status: 'Success',
            message: 'The Category find is successful',
            data: result
        })
    }
    catch(error){
        res.status(400).json({
            status: 'fail',
            message: 'category cannot be find',
            error: error.message
        })
    }
}
// exports.getACategory = async(req, res, next) =>{
//     try{
//         const {id} = req.params;
//         const result = await getACategoryService(id)
//         res.status(200).json({
//             status: 'Success',
//             message: 'The Category find is successful',
//             data: result
//         })
//     }
//     catch(error){
//         res.status(400).json({
//             status: 'fail',
//             message: 'category cannot be find',
//             error: error.message
//         })
//     }
// }