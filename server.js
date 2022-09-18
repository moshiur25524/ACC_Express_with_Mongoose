const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");
// const DBConnect = require("./utils/dbConnect");

const app = require("./app");
const dbConnect = require("./utils/dbConnect");

// database connection
mongoose.connect(process.env.DATABASE_LOCAL).then(()=>{
  console.log('Database connection is successfull' .blue.bold);
})


// server
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});

