const Supplier = require("../models/Supplier")


exports.getSupplierService = async() =>{
    const suppliers = await Supplier.find({})
    return suppliers
}