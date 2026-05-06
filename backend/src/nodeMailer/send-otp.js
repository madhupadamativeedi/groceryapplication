const nodemailer  =require("nodemailer");
const dotEnv = require("dotenv");

dotEnv.config();


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});


exports.sendOTPEmail = async(email,otp)=>{

    try {
  const info = await transporter.sendMail({
    from: `"OTP Sender" <${process.env.SMTP_USER}>`, 
    to: email,
    subject: "Otp verification MSG",
    text: `Your OTP is: ${otp}. It expires in 5 minutes.`,
    html: ` <p>Your OTP is: <b>${otp}</b></p>
        <p>It expires in <b>10 minutes</b>.</p>`,
  });

} catch (err) {
  console.error("Error while sending mail:", err);
}
}