const mongoose = require('mongoose')

// Product Schema Design

const productSchema = mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please provide the name of the product'],
      trim: true,
      unique: [true, 'Name must be unique'],
      minLength: [3, 'Name must be at least 3 characters'],
      maxLength: [100, 'Name is too large']
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      // min: [0, "price can't be nagative"],
      // enum: {
      //   values: ['kg', 'letre', 'pcs'],
      //   message: "Unit can't be {VALUE}, must be kg/letre/pcs "
      // }
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity can't be negative"],
      // validate: {
      //   validator: (value) => {
      //     const isInteger = Number.isInteger(Number(value))
      //     if (isInteger) {
      //       return true
      //     }
      //     else {
      //       return false
      //     }
      //   }
      // },
      message: 'Quantity must be an integer'
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ['in-stock', 'out-of-stock', 'discontinued'],
        message: "Status can't be {VALUE}"
      }
    },
    createdAt: {
      type: Date,
      defalut: Date.now(),
    },
    updateAt: {
      type: Date,
      default: Date.now()
    },
    // supplier: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "supplier"
    // },
    // categories: [{
    //   name: {
    //     type: String,
    //     required: true
    //   },
    //   _id: mongoose.Schema.Types.ObjectId
    // }],
    timestamps: false
  })
  
  // mongoose middleWare for saving data: pre/ post
  
  productSchema.pre('save', function (next) {
    console.log('Before saving data');
  
    if (this.quantity == 0) {
      this.status = 'out-of-stock'
    }
    next()
  })
  
  productSchema.post('save', function (doc, next) {
    console.log('After saving data');
    next()
  })
  
  productSchema.methods.logger = function () {
    console.log(`Data is Saved for ${this.name}`);
  }
  
  // Schema -> Model ->  QUERY  
  
  const Product = mongoose.model('Product', productSchema)
  
  
//   app.get("/", (req, res) => {
//     res.send("Route is working! YaY!");
//   });
  
  // app.post('/api/v1/product', )
  
  // app.get('/api/v1/product', )

  module.exports = Product;