const express = require("express");
const userController = require("../controller/userController");
const routeUser = express.Router()

routeUser.post('/login', userController.login)
routeUser.post('/registerUser', userController.registerUser)
routeUser.post('/registerAdmin', userController.registerAdmin)
routeUser.post('/logout', userController.logout)

module.exports = routeUser