const { User, BlacklistToken } = require("../models")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const { Op } = require("sequelize")
const bcrypt = require('bcrypt');

dotenv.config()
const userController = {}

const isTokenBlacklisted = async (token) => {
    const blacklistedToken = await BlacklistToken.findOne({
        where: {
            token: token,
        },
    });
    return !!blacklistedToken;
}

/*
    this is auto generate example, you can continue 

*/
userController.index = async(req,res) => {
    res.json({
        message : "Hello userController"
    })
}

userController.login = async (req, res) => {

    try {
        const { username, password } = req.body
        const findUser = await User.findOne({
            where: {
                username: {
                    [Op.like]: `%${username}%`
                }
            }
        })
        const comparePassword = await bcrypt.compare(password, findUser.password)
        if (comparePassword) {
            const payloadToken = {
                id: findUser.id,
                email: findUser.email,
                username: findUser.username,
                role: findUser.role
            }
            const token = jwt.sign(payloadToken, process.env.PRIVATE_KEY, {
                algorithm: 'HS256',
                expiresIn: '3h'
            })
            return res.status(200).json({
                data: {
                    message: "Berhasil Login !",
                    token: token
                }
            })
        } else {
            return res.status(401).json({
                data: {
                    message: "Gagal Login ! Username & Password Salah",
                }
            })
        }

    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                data: {
                    message: "Gagal Login !",
                    token: error.message
                }
            })
        } else {
            return res.status(401).json({
                data: {
                    message: "Gagal Login !",
                    token: error.message
                }
            })
        }
    }
}

userController.register = async (req, res) => {
    const { username, email, password, role } = req.body
    const saltRounds = 10;
    const generateSalt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, generateSalt);
    const createUser = await User.create({
        username: username,
        email: email,
        password: hashPassword,
        role: role,
        passwordSalt: generateSalt
    })
    if (typeof email !== 'string' || email.trim() === '' || !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(email)) {
        return res.status(400).json({ error: 'Email harus valid dan wajib diisi' });
    }
    if (!username || !password || !role) {
        return res.status(400).json({
            error: 'Semua field harus diisi',
        });
    }
    return res.status(201).json({
        message: 'User Berhasil dibuat !'
    })
}

userController.logout = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        // Check if the token is blacklisted
        const isBlacklisted = await isTokenBlacklisted(token);

        if (isBlacklisted) {
            return res.status(401).json({
                data: {
                    message: "Token has already been invalidated",
                },
            });
        }

        // Blacklist the token
        await BlacklistToken.create({
            token: token,
        });

        return res.status(200).json({
            data: {
                message: "Logout successful",
            },
        });
    } catch (error) {
        return res.status(500).json({
            data: {
                message: "Internal server error",
            },
        });
    }
}

module.exports = userController

