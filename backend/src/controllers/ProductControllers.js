
const ProductModel = require("../models/products");

exports.createProduct = async (req, res) => {
  
  try {
    const { name, price, desc, units, category,isOpen } = req.body;
    const images = req.file ? `/uploads/${req.file.filename}` : null;
    const product = await ProductModel.create({
      name,
      price,
      desc,
      units,
      category,
      images,
      isOpen
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating product: " + error.message,
    });
  }
};


exports.getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json({
      success: true,
      msg: "All products fetched successfully",
      products,
    })
    
  } catch (error) {
    res.status(500).json({
      scuccess: false,
      msg: "Error fetching products: " + error.message, 
    });
  }
}