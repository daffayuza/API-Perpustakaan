const { Kategori } = require("../models")
const kategoriController = {}

kategoriController.create = async (req, res) => {
    const { nama_kategori } = req.body
    if (typeof nama_kategori !== 'string' || nama_kategori.trim() == '') {
        return res.status(400).json({
            error: 'Nama Kategori harus berupa huruf dan wajib diisi !'
        })
    }
    try {
        const createKategori = await Kategori.create({
            nama_kategori: nama_kategori
        })
        return res.status(201).json({
            message: 'Data Berhasil Ditambahkan !'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        })
    }
}

kategoriController.getAll = async (req, res) => {
    try {
        const getKategori = await Kategori.findAll({
            order: [["createdAt", "DESC"]]
        })
        return res.status(200).json({
            data: getKategori
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        })
    }
}

kategoriController.getById = async (req, res) => {
    const { id } = req.params
    try {
        const getDetailKategori = await Kategori.findOne({
            where: {
                id: id
            }
        })
        if (!getDetailKategori) {
            return res.status(404).json({
                message: 'Data Tidak ditemukan !',
            });
        }
        return res.status(200).json({
            data: getDetailKategori
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        })
    }
}

kategoriController.update = async (req, res) => {
    const { nama_kategori } = req.body
    const id = req.params.id
    if (typeof nama_kategori !== 'string' || nama_kategori.trim() == '') {
        return res.status(400).json({
            error: 'Nama Kategori harus berupa huruf dan wajib diisi !'
        })
    }
    try {
        const getDetailKategori = await Kategori.findOne({
            where: {
                id: id
            }
        })
        if (getDetailKategori === null) {
            return res.status(404).json({
                message: 'Data tidak ditemukan!'
            })
        }
        const updateKategori = await Kategori.update({
            nama_kategori: nama_kategori
        }, {
            where: {
                id: id
            }
        })
        return res.status(200).json({
            message: 'Data Berhasil Diubah !'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        })
    }

}

kategoriController.delete = async (req, res) => {
    const { id } = req.params
    try {
        const deleteKategori = await Kategori.destroy({
            where: {
                id: id
            }
        })
        if (!deleteKategori) {
            return res.status(404).json({
                message: 'Data tidak ditemukan!'
            })
        }
        return res.status(200).json({
            message: 'Data Berhasil Dihapus !'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        })
    }
}

module.exports = kategoriController

