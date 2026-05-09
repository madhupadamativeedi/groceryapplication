const user =require("../models/userModel");
const { generateotp } = require("../nodeMailer/generate-otp");
const { sendOTPEmail } = require("../nodeMailer/send-otp");
const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");



dotEnv.config();


exports.sendOtp = async(req,res)=>{

try {
    const {name,email,password}=req.body;
    if(!name || !email || !password){
        return res.status(400).json({
            sucess:false,
            msg:"Please provide all the details"
        })
    }
    const existingUser = await user.findOne({email});
    if(!existingUser){
        existingUser =user.create({name,email,password})
    }
    const otp = generateotp();
    existingUser.otp = otp;
    existingUser.otpExpiry = Date.now()+5*60*1000;
    await existingUser.save();
    await sendOTPEmail(email,otp);
    res.status(200).json({
        sucess:true,
        msg:"OTP sent successfully",
        user:existingUser
    }) 
} catch (error) {
    res.status(500).json({
        sucess:false,
        msg:"Error occurred while sending OTP"
    })
}
}


exports.verifyOtp = async(req, res)=>{
    try {
        const {email,otp}=req.body;

        if(!email || !otp){
            return res.status(400).json({
                sucess:false,
                msg:"Please provide all the details"
            })
        }
      const existingUser = await user.findOne({email});
      if(!existingUser){
        return res.status(404).json({sucess:false, msg:"User not found"})
      };
      if(otp !== existingUser.otp || !existingUser.otp){
        return res.status(400).json({success:false, msg:"Invalid Otp"})
      };
      if(existingUser.otpExpiry <Date.now()){
        return res.status(400).json({sucess:false, msg:"OTP has Expired please request for new Otp"})
      }
      existingUser.otp = null;
      existingUser.otpExpiry = null;
      await existingUser.save();
      const token = jwt.sign({id:existingUser._id, email: existingUser.email}, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.status(200).json({
        success:true,
        msg:"OTP verified Sucessfully",
        token:token
      })

        
    } catch (error) {
        res.status(500).json({
            sucess:false,
            msg:"Error occurred while verifying OTP"
        })
    }
}