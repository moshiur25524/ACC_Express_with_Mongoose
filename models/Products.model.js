const mongoose = require('mongoose')
const validator = require('validator');

const { ObjectId } = mongoose.Schema.Types;

// Product Schema Design

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide the name of the product'],
    trim: true,
    unique: [true, 'Name must be unique'],
    lowercase: true,
    minLength: [3, 'Name must be at least 3 characters'],
    maxLength: [100, 'Name is too large']
  },
  description: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    enum: {
      values: ['kg', 'litre', 'pcs', 'bag'],
      message: '{VALUE} is not a valid value'
    }
  },
  imageURLs: [{
    type: String,
    required: true,
    validate: [validator.isURL, 'please Provide a valide URL']
    // {
    //   validator: () => {
    //     if (!Array.isArray(value)) {
    //       return false
    //     }
    //     let isValid = true
    //     value.forEach(url => {
    //       if (!validator.isURL(url)) {
    //         isValid = false
    //       }
    //     })
    //     return isValid
    //   },
    //   message: 'Please Provide the valid URLs'
    // }
  }],
  category: {
    type: String,
    required: true
  },
  brand: {
    name: {
      type: String,
      required: true
    },
    id: {
      type: ObjectId,
      ref: "Brand",
      required: true
    }
  }

}, {
  timestamps: true
})

productSchema.pre('save', function (next) {
  console.log('Before saving data');

  if (this.quantity == 0) {
    this.status = 'out-of-stock'
  }
  next()
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product;