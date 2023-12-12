const express = require("express")
const anggotaController = require("../controller/anggotaController")
const isAdmin = require("../middleware/isAdmin");
const isUser = require("../middleware/isUser");
const routeAnggota = express.Router()

routeAnggota.post('/', isAdmin, anggotaController.create)
routeAnggota.get('/get', isUser, anggotaController.getAll)
routeAnggota.get('/get/:id', isUser, anggotaController.getById)
routeAnggota.put('/update/:id', isAdmin, anggotaController.update)
routeAnggota.delete('/delete/:id', isAdmin, anggotaController.delete)

module.exports = routeAnggota