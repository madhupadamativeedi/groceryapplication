
const sendOTPController = require("../controllers/sendotpController");

const express =require("express")

const router =express.Router();


router.post("/send-otp", sendOTPController.sendOtp);
router.post("/verify-otp", sendOTPController.verifyOtp);

module.exports = router;
