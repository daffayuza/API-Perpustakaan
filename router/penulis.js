const express = require("express")
const penulisController = require("../controller/penulisController")
const isAdmin = require("../middleware/isAdmin");
const isUser = require("../middleware/isUser");
const routePenulis = express.Router()

routePenulis.post('/', isAdmin, penulisController.create)
routePenulis.get('/get', isUser, penulisController.getAll)
routePenulis.get('/get/:id', isUser, penulisController.getById)
routePenulis.put('/update/:id', isAdmin, penulisController.update)
routePenulis.delete('/delete/:id', isAdmin, penulisController.delete)

module.exports = routePenulis