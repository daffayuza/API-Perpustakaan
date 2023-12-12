const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { BlacklistToken } = require("../models");
dotenv.config();

const authVerify = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split("Bearer")[1]?.trim();
        if (!token) {
            throw new Error("Token Tidak Boleh Kosong !");
        }

        // Check if the token is blacklisted
        const isBlacklisted = await BlacklistToken.findOne({
            where: {
                token: token,
            },
        });

        if (isBlacklisted) {
            throw new Error("Token telah dinonaktifkan");
        }

        const verifyToken = jwt.verify(token, process.env.PRIVATE_KEY);
        if (verifyToken) {
            req.user = {
                id: verifyToken.id,
                username: verifyToken.username,
                email: verifyToken.email,
                role: verifyToken.role,
            };
            next();
        }
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                message: error.message,
            });
        }
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                message: error.message,
            });
        } else {
            return res.status(401).json({
                message: error.message,
            });
        }
    }
};

module.exports = authVerify;
