
const sendOTPController = require("../controllers/sendotpController");

const express =require("express")

const router =express.Router();


router.post("/send-otp", sendOTPController.sendOtp);

module.exports = router;
