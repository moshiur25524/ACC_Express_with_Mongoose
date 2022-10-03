
const {  updateASupplierService, getASupplierByIdService, createSupplierService, getSuppliersService } = require("../services/supplier.service")


exports.createSupplier = async(req, res) =>{
    try{
        const supplier = await createSupplierService(req.body)
        res.status(200).json({
            status: 'success',
            message: 'The Supplier creation is successfull',
            data: supplier
        })
    }
    catch(error){
        res.status(400).json({
            status:'fail',
            message:'The Supplier Creation is failed',
            error: error.message
        })
    }
}

exports.getSuppliers = async(req, res, next) =>{
    try{
        const suppliers = await getSuppliersService()
        res.status(200).json({
            status: 'success',
            message: 'The Supplier get is successfull',
            data: suppliers
        })
    }
    catch(error){
        res.status(400).json({
            status:'fail',
            message:'The Suppliers find is failed',
            error: error.message
        })
    }
}

exports.getASupplierById = async(req, res, next) =>{
    try{
        const {id} = req.params;
        const supplier = await getASupplierByIdService(id)
        res.status(200).json({
            status: 'success',
            message: 'The Suppliers get is successfull',
            data: supplier
        })
    }
    catch(error){
        res.status(400).json({
            status:'fail',
            message:'A Single Supplier get is failed',
            error: error.message
        })
    }
}
exports.updateSupplierById = async(req, res, next) =>{
    try{
        const {id} = req.params;
        const supplier = await updateASupplierService(id, req.body)

        if(!supplier.nModified){
            res.status(400).json({
                status: 'fail',
                message: "Couldn't update the Supplier",
                error: error.message
            })
        }
        res.status(200).json({
            status: 'success',
            message: 'The Supplier update is successfull',
            data: supplier
        })
    }
    catch(error){
        res.status(400).json({
            status:'fail',
            message:'A Single Supplier update is failed',
            error: error.message
        })
    }
}