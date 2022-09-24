const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types;

// Product Schema Design

const stockSchema = mongoose.Schema({
  ProductId: {
    type: ObjectId,
    required: true,
    ref: 'Product'
  },
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
    validate: {
      validator: () => {
        if (!Array.isArray(value)) {
          return false
        }
        let isValid = true
        value.forEach(url => {
          if (!validator.isURL(url)) {
            isValid = false
          }
        })
        return isValid
      },
      message: 'Please Provide the valid URLs'
    }
  }],
  price: {
    type: Number,
    required: true,
    min: [0, "Product Price can't be nagetive"]
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, "Product quantity can't be nagetive"]
  },
  category: {
    type: String,
    required: true,
    min: [0, "Please Provide a Category"]
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
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ['in-stock', 'out-of-stock'],
      message: "Status can't be {VALUE}"
    }
  },
  store: {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please Provide the store Name'],
      lowercase: true,
      enum: {
        values: ['dhaka', 'khulna', 'rajshahi', 'chittagong', 'sylet', 'barishal', 'mymensingh', 'rangpur'],
        message: "{VALUE} is not a valid name"
      }
    },
    id:{
      type: ObjectId,
      required: true,
      ref:"Store"
    }
  },
  suppliedBy:{
    name: {
      type: String,
      required: [true, 'Please provide the name of the product'],
      trim: true,
      unique: [true, 'Name must be unique']
    },
    id:{
      type: ObjectId,
      ref:"Supplier"
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

const Stock = mongoose.model('Stock', stockSchema)

module.exports = Stock;