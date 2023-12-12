const express = require("express")
const kategoriController = require("../controller/kategoriController")
const isAdmin = require("../middleware/isAdmin");
const isUser = require("../middleware/isUser");
const routeKategori = express.Router()

routeKategori.post('/', isAdmin, kategoriController.create)
routeKategori.get('/get', isUser, kategoriController.getAll)
routeKategori.get('/get/:id', isUser, kategoriController.getById)
routeKategori.put('/update/:id', isAdmin, kategoriController.update)
routeKategori.delete('/delete/:id', isAdmin, kategoriController.delete)

module.exports = routeKategori