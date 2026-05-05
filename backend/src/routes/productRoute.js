const productController = require('../controllers/ProductControllers');
const getAllProducts = require('../controllers/ProductControllers');
const upload = require('../middlewares/imageMiddleware');
const adminMiddleware = require("../middlewares/adminMiddleware");

const express = require('express');



const router= express.Router();


router.post("/Products",adminMiddleware.adminTokenVerification, upload.single("image"), productController.createProduct);
router.get("/products",getAllProducts.getAllProducts)
module.exports = router;