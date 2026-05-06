const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");


// imports routes 
const productRoute = require("./routes/productRoute");
const adminRoute = require('./routes/adminRoute');
const userEmailRoute = require("./routes/userEmailRoute");


// DB and .env configurations
dotenv.config();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });



// middlewares and routes implementation
const app = express();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use("/api/v1", productRoute);
app.use("/api/v1", adminRoute);
app.use("/api/v1", userEmailRoute);


// server running 
const port = 3000;
app.listen(port, () => {
  console.log("Server is Running on port " + port);
});
