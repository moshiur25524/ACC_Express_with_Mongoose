const mongoose = require('mongoose')
const validator = require('validator')
const {ObjectId} = mongoose.Schema.Types;

const supplierSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please provide a name'],
        trim: true,
        minLength: [3, 'Name must be at least 3 characters'],
        maxLength: [100, 'Name is too large']
    },
    email:{
        type: String,
        validate: [validator.isEmail, 'Please Provide a valid Email'],
        trim: true,
        lowercase: true,
        unique: true
    },
    brand:{
        name:{
            type: String,
            trim: true,
            required: true
        },
        id:{
            type: ObjectId,
            required: true,
            ref: "Brand"
        }
    },
    contactNumber: [{
        type: String,
        required: [true, 'Please Provide a contact Number'],
        validate: {
            validator: (value) =>{
                return validator.isMobilePhone(value)
            },
            message: 'Please provide a valid phone number'
        }
    }],
    emergencyContactNumber: {
        type: String,
        required: [true, 'Please Provide a emergency Contact Number'],
        validate: {
            validator: (value) =>{
                return validator.isMobilePhone(value)
            },
            message: 'Please provide a valid phone number'
        }
    },
    tradeLicenceNumber: {
        type: String,
        required: [true,'Please Provide Your trade licence number']
    },
    presentAddress: {
        type: String,
        required: [true,'Please Provide Your Present Address']
    },
    permanentAddress: {
        type: String,
        required: [true,'Please Provide Your Permanent Address']
    },
    location:{
        type: String,
        required: [true, 'Please Provide the Location'],
        lowercase: true,
        enum:{
            values: ['dhaka','khulna','rajshahi','chattogram','sylet','barishal','mymensingh','rangpur'],
            message: "{VALUE} is not a accurate division"
        }  
    },
    imageURL:{
        type: String,
        validate: [validator.isURL, 'Please Provide a valide URL']
    },
    nationalIdImageURL:{
        type: String,
        required: true,
        validate: [validator.isURL, 'Please Provide a valide URL']
    },
    status:{
        type: String,
        default: 'active',
        enum: ['active','in-active']
    }
},{
    timestamps: true
});

const Supplier = mongoose.model('Supplier',supplierSchema)

module.exports = Supplier