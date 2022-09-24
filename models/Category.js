const mongoose = require('mongoose');
const validator = require('validator');
const {ObjectId} = mongoose.Schema.Types;

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please Provide a category Name'],
        lowercase: true,
        unique: true
    },
    description: String,
    imgUrl: {
        type: String,
        validate: [validator.isURL, 'please Provide a valide Email']
    }
},{
    timestamps: true
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category