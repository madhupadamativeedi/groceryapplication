const user =require("../models/userModel");
const { generateotp } = require("../nodeMailer/generate-otp");
const { sendOTPEmail } = require("../nodeMailer/send-otp");


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