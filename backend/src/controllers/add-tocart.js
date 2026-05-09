const Cart = require("../models/cart");
const Product = require("../models/products");


exports.addToCart = async(req,res)=>{

  const UserId = req.id;
  try {

    const {productId, quantity }  = req.body;
    if(!productId || !quantity){
      return res.status(400).json({
        sucess:false,
        msg:"Please provide productId and quantity"
      });
    }
    const productIdExist = await Product.findById(productId);
    if(!productIdExist){
      return res.status(404).json({
        sucess:false,
        msg:"Product not found"
      })
    }   
    let cart = await Cart.findOne({user:UserId});
    if(!cart){
      cart = await Cart.create({
        user:UserId,
        items:[{
          productId:productIdExist._id,
          quantity:quantity
        }]
      });
      return res.status(200),json({
        sucess:true,
        msg:"Product added to cart",
        cart
      })
    }
    const itemsIndex = cart.items.findIndex(item => item.productId.toString() === productIdExist._id.toString());
    if(itemsIndex > -1){
      cart.items[itemsIndex].quantity += quantity;
    }else{
      cart.items.push({
        productId:productIdExist._id,
        quantity:quantity
      });
    }
    await cart.save();
    res.status(200).json({
      success:true,
      msg:"Product added to cart",
      
    })
    
  } catch (error) {
    res.status(500).json({
      sucess:false,
      msg:"Error occurred while adding product to cart"
    })
  
  }
}


exports.getCart = async(req,res)=>{

  try {
    const userId =req.id;
    if(!userId){
      return res.status(401).json({
        success:false,
        msg:"User not authenticated"
      });
    }
    const cart = await Cart.findOne({user:userId}).populate("user","email").populate("items.productId")
    if(!cart){
      return res.status(404).json({
        success:false,
        msg:"Cart not found"
      })
    }
    res.status(200).json({
      success:true,
      msg:"Cart retrieved successfully",
      carts:cart
    })
    
    
    
  } catch (error) {
     res.status(500).json({
      sucess:false,
      msg:"Error occurred while adding product to cart"
    })
  }
  
}


exports.removeFromCart = async(req,res)=>{

  const userId = req.id;
  try {
    const cart = await Cart.findOneAndUpdate(
      {user:userId},
    {$pull:{items:{productId:req.body.productId}}},
  {new:true})
  if(!cart){
    return res.status(404).json({
      success:false,
      msg:"Cart not found"
    });

  };
  res.status(200).json({
    success:true,
    msg:"Product removed from cart",
    cart:cart
  })

  } catch (error) {
    res.status(500).json({
      success:false,
      msg:"Error occurred while removing product from cart" 
    })
  
    
  }
}



exports.updateItemsInCart = async (req, res) => {
  const userId = req.id;

  try {
    const { productId, quantity } = req.body;

    // Validation
    if (!productId || quantity === undefined) {
      return res.status(400).json({
        success: false,
        msg: "Please provide productId and quantity",
      });
    }

    // Find cart
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        msg: "Cart not found",
      });
    }

    // Find item index
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId.toString()
    );

    // Product not found
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        msg: "Product not found in cart",
      });
    }

    // Remove item if quantity <= 0
    if (quantity <= 0) {
      cart.items = cart.items.filter(
        (item) => item.productId.toString() !== productId.toString()
      );

      await cart.save();

      return res.status(200).json({
        success: true,
        msg: "Product removed from cart",
        cart,
      });
    }

    // Update quantity
    cart.items[itemIndex].quantity = quantity;

    await cart.save();

    res.status(200).json({
      success: true,
      msg: "Product updated in cart",
      cart,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      msg: "Error occurred while updating product in cart",
    });
  }
};