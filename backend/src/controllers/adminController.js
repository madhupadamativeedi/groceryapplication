const admin = require("../models/adminmodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.createAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingAdmin = await admin.findOne({ email });
    if (existingAdmin) {
      res.status(400).json({
        sucess: false,
        msg: "Admin already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const createdAdmin = await admin.create({
      name,
      email,
      password: hashedPassword,
    });
    // const token = jwt.sign({ id: createdAdmin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({
      sucess: true,
      msg: "Admin created successfully",
      createdAdmin,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      msg: "Internal server error",
    });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingAdmin = await admin.findOne({ email });
    if (!existingAdmin) {
      res.status(400).json({
        msg: "Admin not found",
        sucess: false,
      });
    }


    // Comare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(
      password,
      existingAdmin.password,
    );
    if (!isPasswordValid) {
      res.status(400).json({
        msg: "Invalid password",
        sucess: false,
      });
    }

    // Generate JWT token
    const token = jwt.sign({ id: existingAdmin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({
      msg: "Admin login successful",
      sucess: true,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
      sucess: false,
    });
  }
};
