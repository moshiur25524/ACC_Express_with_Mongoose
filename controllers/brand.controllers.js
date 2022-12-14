const { createBrandService, getBrandsService, getABrandService, updateABrandService } = require("../services/brand.service")


exports.createBrand = async(req, res, next) =>{
    try{
        const brand = await createBrandService(req.body)
        res.status(200).json({
            status: 'success',
            message: 'The Brand creation is successfull',
            data: brand
        })
    }
    catch(error){
        res.status(400).json({
            status:'fail',
            message:'The Brand Creation is failed',
            error: error.message
        })
    }
}

exports.getBrands = async(req, res, next) =>{
    try{
        const brands = await getBrandsService()
        res.status(200).json({
            status: 'success',
            message: 'The Brands get is successfull',
            data: brands
        })
    }
    catch(error){
        res.status(400).json({
            status:'fail',
            message:'The Brand find is failed',
            error: error.message
        })
    }
}

exports.getABrand = async(req, res, next) =>{
    try{
        const {id} = req.params;
        const brand = await getABrandService(id)
        res.status(200).json({
            status: 'success',
            message: 'The Brands get is successfull',
            data: brand
        })
    }
    catch(error){
        res.status(400).json({
            status:'fail',
            message:'A Single Brand get is failed',
            error: error.message
        })
    }
}
exports.updateABrandById = async(req, res, next) =>{
    try{
        const {id} = req.params;
        const brand = await updateABrandService(id, req.body)

        if(!brand.nModified){
            res.status(400).json({
                status: 'fail',
                message: "Couldn't update the brand",
                error: error.message
            })
        }
        res.status(200).json({
            status: 'success',
            message: 'The Brand update is successfull',
            data: brand
        })
    }
    catch(error){
        res.status(400).json({
            status:'fail',
            message:'A Single Brand update is failed',
            error: error.message
        })
    }
}