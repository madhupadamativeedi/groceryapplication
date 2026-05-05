const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");

dotEnv.config();



exports.adminTokenVerification = (req,res,next)=>{

    const token = req.headers.authorization?.split(" ")[1];

    if(!token){
        res.status(401).json({msg:"Unauthorized access / Token not provided", sucess: false});
    }
   try {
    
     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded){
        res.status(401).json({msg:"Unauthorized access / Invalid token", sucess: false});   }
        req.id = decoded.id;
        next();
   } catch (error) {
    res.status(401).json({msg:"Unauthorized access / Invalid token", sucess: false});
   }

}