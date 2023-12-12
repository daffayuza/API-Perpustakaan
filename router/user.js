const express = require("express");
const userController = require("../controller/userController");
const routeUser = express.Router()

routeUser.post('/login', userController.login)
routeUser.post('/register', userController.register)
// routeUser.post('/refresh-token', userController.refreshToken)
routeUser.post('/logout', userController.logout)

module.exports = routeUser