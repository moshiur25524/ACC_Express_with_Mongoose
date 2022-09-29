const Store = require("../models/Store");
const { createStoreService, getStoreService, getAStoreByIdService } = require("../services/store.service");

exports.getStore = async(req, res) =>{
    try{
        const result = await getStoreService();
        res.status(200).json({
            status: 'Success',
            message: "Stores are found successfully",
            data: result
        })
    }
    catch(error){
        res.status(400).json({
            status: 'fail',
            message: 'The Store cannot found',
            error: error.message
        })
    }
}

exports.getAStoreById = async(req, res) =>{
    try{
        const {id} = req.params;
        const result = await getAStoreByIdService(id)
        res.status(200).json({
            status: 'Success',
            message: 'The Store find is successfull',
            data: result
        })
    }
    catch(error){
      res.status(400).json({
        status: 'fail',
        message: 'The Store cannot found',
        error: error.message
      })
    }
}

exports.createStore = async(req, res) =>{
    try{
        const stores = req.body;
        const result = await createStoreService(stores)
        res.status(200).json({
            status: 'Success',
            message: 'Store Created Successfully',
            data: result
        })
    }
    catch(error){
        res.status(400).json({
            status: 'fail',
            message: 'Store creation is failed',
            error: error.message
        })
    }
}