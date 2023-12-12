const { Penulis } = require("../models")

const penulisController = {}

/*
    this is auto generate example, you can continue 

*/
penulisController.index = async (req, res) => {
    res.json({
        message: "Hello penulisController"
    })
}

//tambah data penulis
penulisController.create = async (req, res) => {
    const { nama_penulis, tanggal_lahir, negara_asal } = req.body
    if (typeof nama_penulis !== 'string' || nama_penulis.trim() === '') {
        return res.status(400).json({ error: 'Nama Penulis harus berupa Huruf dan wajib diisi' });
    }
    if (typeof tanggal_lahir !== 'string' || tanggal_lahir.trim() === '') {
        return res.status(400).json({ error: 'Tanggal Lahir harus diisi' });
    }
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (typeof tanggal_lahir !== 'string' || tanggal_lahir.trim() === '' || !dateRegex.test(tanggal_lahir)) {
        const error = 'Format Tanggal Lahir tidak valid. Gunakan format YYYY-MM-DD.';
        console.error(error);
        return res.status(400).json({ error });
    }

    const inputDate = new Date(tanggal_lahir);

    if (isNaN(inputDate.getTime())) {
        return res.status(400).json({ error: 'Tanggal Lahir tidak valid.' });
    }
    if (typeof negara_asal !== 'string' || negara_asal.trim() === '') {
        return res.status(400).json({ error: 'Negara Asal harus berupa Huruf dan wajib diisi' });
    }
    try {
        const createPenulis = await Penulis.create({
            nama_penulis: nama_penulis,
            tanggal_lahir: tanggal_lahir,
            negara_asal: negara_asal
        })
        return res.status(201).json({
            message: 'Data Berhasil Ditambahkan!'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        })
    }
}

//menampilkan semua penulis
penulisController.getAll = async (req, res) => {
    try {
        const getPenulis = await Penulis.findAll({
            order: [["createdAt", "DESC"]]
        })
        return res.status(200).json({
            data: getPenulis
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        })
    }
}

//menampilkan penulis by id
penulisController.getById = async (req, res) => {
    const { id } = req.params
    try {
        const getDetailPenulis = await Penulis.findOne({
            where: {
                id: id
            }
        })
        if (!getDetailPenulis) {
            return res.status(404).json({
                message: 'Data Tidak ditemukan !',
            });
        }
        return res.status(200).json({
            data: getDetailPenulis
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        })
    }
}

//update data penulis
penulisController.update = async (req, res) => {
    const { nama_penulis, tanggal_lahir, negara_asal } = req.body
    const id = req.params.id
    if (typeof nama_penulis !== 'string' || nama_penulis.trim() === '') {
        return res.status(400).json({ error: 'Nama Penulis harus berupa Huruf dan wajib diisi' });
    }
    if (typeof tanggal_lahir !== 'string' || tanggal_lahir.trim() === '') {
        return res.status(400).json({ error: 'Tanggal Lahir harus diisi' });
    }
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (typeof tanggal_lahir !== 'string' || tanggal_lahir.trim() === '' || !dateRegex.test(tanggal_lahir)) {
        const error = 'Format Tanggal Lahir tidak valid. Gunakan format YYYY-MM-DD.';
        console.error(error);
        return res.status(400).json({ error });
    }

    const inputDate = new Date(tanggal_lahir);

    if (isNaN(inputDate.getTime())) {
        return res.status(400).json({ error: 'Tanggal Lahir tidak valid.' });
    }
    if (typeof negara_asal !== 'string' || negara_asal.trim() === '') {
        return res.status(400).json({ error: 'Negara Asal harus berupa Huruf dan wajib diisi' });
    }
    try {
        const getDetailPnl = await Penulis.findOne({
            where: {
                id: id
            }
        })
        if (getDetailPnl === null) {
            return res.status(404).json({
                message: 'Data Tidak Ditemukan !'
            })
        }

        const updatePenulis = await Penulis.update({
            nama_penulis: nama_penulis,
            tanggal_lahir: tanggal_lahir,
            negara_asal: negara_asal
        }, {
            where: {
                id: id
            }
        })
        return res.status(200).json({
            message: 'Data Berhasil Diubah!'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        })
    }
}

//hapus data penulis
penulisController.delete = async (req, res) => {
    const { id } = req.params
    try {
        const deletePnl = await Penulis.destroy({
            where: {
                id: id
            }
        })
        if (!deletePnl) {
            return res.status(404).json({
                message: 'Data tidak ditemukan!'
            })
        }
        return res.status(200).json({
            message: 'Data Berhasil Dihapus!'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        })
    }
}

module.exports = penulisController
