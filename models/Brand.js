const mongoose = require('mongoose')
const validator = require('validator')
const {ObjectId} = mongoose.Schema.Types;

const brandSchema = mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: [true, 'Please Provide the brand Name'],
        unique: true,
        lowercase: true,
        maxLength: 100,
    },
    description: String,
    email:{
        type: String,
        validate: [validator.isEmail, 'Please Provide the valid Email'],
        lowercase: true
    },
    website:{
        type: String,
        validate: [validator.isURL, 'Please Provide the valid URL']
    },
    location: String,
    products: [{
        type: ObjectId,
        ref: 'Product'
    }],
    suppliers: [{
        name: String,
        contactNumber: String,
        id:{
            type: ObjectId,
            ref:'Supplier'
        }
    }],
    status:{
        type: String,
        enum:['active', 'in-active'],
        default: 'active'
    }
},{
    timestamps: true
})

const Brand = mongoose.model('Brand', brandSchema)

module.exports = Brand;