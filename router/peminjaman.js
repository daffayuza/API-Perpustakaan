const express = require("express")
const peminjamanController = require("../controller/peminjamanController")
const isAdmin = require("../middleware/isAdmin");
const isUser = require("../middleware/isUser");
const routePeminjaman = express.Router()

routePeminjaman.post('/', isUser, peminjamanController.create)
routePeminjaman.get('/get', isUser, peminjamanController.getAll)
routePeminjaman.get('/get/:id', isUser, peminjamanController.getById)
routePeminjaman.put('/update/:id', isUser, peminjamanController.update)
routePeminjaman.post('/pengembalian/:id', isUser, peminjamanController.pengembalianBuku);
routePeminjaman.delete('/delete/:id', isUser, peminjamanController.delete)

module.exports = routePeminjaman