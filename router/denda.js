const express = require("express")
const dendaController = require("../controller/dendaController")
const isAdmin = require("../middleware/isAdmin");
const isUser = require("../middleware/isUser");
const routeDenda = express.Router()

routeDenda.post('/', isAdmin, dendaController.create)
routeDenda.get('/get', isAdmin, dendaController.getAll)
routeDenda.get('/get/:id', isAdmin, dendaController.getById)
routeDenda.put('/update/:id', isAdmin, dendaController.update)
routeDenda.delete('/delete/:id', isAdmin, dendaController.delete)

module.exports = routeDenda