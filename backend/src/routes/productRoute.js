const productController = require('../controllers/ProductControllers');
const getAllProducts = require('../controllers/ProductControllers');
const upload = require('../middlewares/imageMiddleware');
const express = require('express');



const router= express.Router();


router.post("/Products",upload.single("image"), productController.createProduct);
router.get("/products",getAllProducts.getAllProducts)
module.exports = router;