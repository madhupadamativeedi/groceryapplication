const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const productRoute = require("./routes/productRoute");

dotenv.config();
const app = express();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

app.use(express.json());

app.use("/api/v1", productRoute);

const port = 3000;

app.listen(port, () => {
  console.log("Server is Running on port " + port);
});
