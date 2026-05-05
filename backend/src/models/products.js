const mongoose = require('mongoose');

const unitsEnum = ["1kg", "2kg", "3kg", "4kg", "5kg"];
const categoryEnum = [
  "fruits",
  "vegetables",
  "dairy",
  "meat",
  "bakery",
  "beverages",
  "snacks",
  "household",
  "personal care"
];

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  units: {
    type: String,
    enum: unitsEnum   
  },
  category: {
    type: String,
    enum: categoryEnum  
  },
  images: {
    type:String,
  },
  isOpen: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);