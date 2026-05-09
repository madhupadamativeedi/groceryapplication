const addToCart = require("../controllers/add-tocart");
const userid = require("../middlewares/verifyOtpMiddleware");

const express = require("express");

const route = express.Router();

route.post("/add-to-cart", userid.otptokenVerification,addToCart.addToCart);
route.get("/get-cart", userid.otptokenVerification,addToCart.getCart);
route.post("/remove-from-cart", userid.otptokenVerification,addToCart.removeFromCart);
route.post("/update-items-in-cart", userid.otptokenVerification,addToCart.updateItemsInCart);



module.exports = route;