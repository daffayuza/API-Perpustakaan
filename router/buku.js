const express = require("express")
const bukuController = require("../controller/bukuController")
const isAdmin = require("../middleware/isAdmin");
const isUser = require("../middleware/isUser");
const routeBuku = express.Router()

routeBuku.post('/', isAdmin, bukuController.create)
routeBuku.get('/get', isUser, bukuController.getAll)
routeBuku.get('/get/:id', isUser, bukuController.getById)
routeBuku.put('/update/:id', isAdmin, bukuController.update)
routeBuku.delete('/delete/:id', isAdmin, bukuController.delete)

module.exports = routeBuku