const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// middleWare
app.use(express.json());
app.use(cors());

// Routes

const productRoutes = require('./routes/product.routes.js')
const brandRoutes = require('./routes/brand.route')
const categoryRoutes = require('./routes/categories.route')

app.get('/', (req, res)=>{
  res.send('route is working ')
})

app.use('/api/v1/product', productRoutes)
app.use('/api/v1/brand', brandRoutes)
app.use('/api/v1/category', categoryRoutes)

module.exports = app;
