const express = require("express");
const adminController = require("../controllers/adminController");


const router = express.Router();

router.post("/admin-register", adminController.createAdmin);
router.post("/admin-login", adminController.loginAdmin);

module.exports = router;