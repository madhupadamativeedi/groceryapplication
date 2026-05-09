const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");

dotEnv.config();

exports.otptokenVerification = (req, res, next) => {
    try {

        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                msg: "Unauthorized access / Token not provided"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                msg: "Unauthorized access / Invalid token"
            });
        }

        req.id = decoded.id;
        req.email = decoded.email;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            msg: "Unauthorized access / Invalid token"
        });
    }
};