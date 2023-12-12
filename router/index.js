const express = require("express");
const exampleController = require("../controller/exampleController");
const authVerify = require("../middleware/authVerify")
const routeUser = require("./user")
const routeKategori = require("./kategori");
const routePenulis = require("./penulis");
const routeBuku = require("./buku");
const routeAnggota = require("./anggota");
const routeDenda = require("./denda")
const routePeminjaman = require("./peminjaman");
const route = express.Router()

route.get('/', exampleController.index)
route.use('/kategori-buku', (req, res, next) => authVerify(req, res, next), routeKategori)
route.use('/penulis-buku', (req, res, next) => authVerify(req, res, next), routePenulis)
route.use('/buku', (req, res, next) => authVerify(req, res, next), routeBuku)
route.use('/anggota', (req, res, next) => authVerify(req, res, next), routeAnggota)
route.use('/denda', (req, res, next) => authVerify(req, res, next), routeDenda)
route.use('/peminjaman', (req, res, next) => authVerify(req, res, next), routePeminjaman)

route.use('/auth', routeUser)

module.exports = route
