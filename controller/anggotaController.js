const { Anggota } = require("../models")
const anggotaController = {}

/*
    this is auto generate example, you can continue 

*/
anggotaController.index = async (req, res) => {
    res.json({
        message: "Hello anggotaController"
    })
}

anggotaController.create = async (req, res) => {
    const { nama, alamat, nomor_telepon, email } = req.body
    if (typeof nama !== 'string' || nama.trim() === '') {
        return res.status(400).json({ error: 'Nama harus berupa Huruf dan wajib diisi' });
    }
    if (typeof alamat !== 'string' || alamat.trim() === '') {
        return res.status(400).json({ error: 'Alamat harus berupa Huruf dan wajib diisi' });
    }
    if (typeof nomor_telepon !== 'string' || nomor_telepon.trim() === '' || !/^[0-9+]+$/.test(nomor_telepon)) {
        return res.status(400).json({ error: 'Nomor Telepon harus berupa Angka dan wajib diisi' });
    }
    if (typeof email !== 'string' || email.trim() === '' || !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(email)) {
        return res.status(400).json({ error: 'Email harus valid dan wajib diisi' });
    }

    try {
        const createAnggota = await Anggota.create({
            nama: nama,
            alamat: alamat,
            nomor_telepon: nomor_telepon,
            email: email
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

anggotaController.getAll = async (req, res) => {
    try {
        const getAnggota = await Anggota.findAll({
            order: [["createdAt", "DESC"]]
        })
        return res.status(200).json({
            data: getAnggota
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        })
    }
}

anggotaController.getById = async (req, res) => {
    const { id } = req.params
    try {
        const getDetailAnggota = await Anggota.findOne({
            where: {
                id: id
            }
        })
        if (!getDetailAnggota) {
            return res.status(404).json({
                message: 'Data Tidak ditemukan !',
            });
        }
        return res.status(200).json({
            data: getDetailAnggota
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        })
    }
}

anggotaController.update = async (req, res) => {
    const { nama, alamat, nomor_telepon, email } = req.body
    const id = req.params.id
    if (typeof nama !== 'string' || nama.trim() === '') {
        return res.status(400).json({ error: 'Nama harus berupa Huruf dan wajib diisi' });
    }
    if (typeof alamat !== 'string' || alamat.trim() === '') {
        return res.status(400).json({ error: 'Alamat harus berupa Huruf dan wajib diisi' });
    }
    if (typeof nomor_telepon !== 'string' || nomor_telepon.trim() === '' || !/^[0-9+]+$/.test(nomor_telepon)) {
        return res.status(400).json({ error: 'Nomor Telepon harus berupa Angka dan wajib diisi' });
    }
    if (typeof email !== 'string' || email.trim() === '' || !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(email)) {
        return res.status(400).json({ error: 'Email harus valid dan wajib diisi' });
    }

    try {
        const getDetailAnggota = await Anggota.findOne({
            where: {
                id: id
            }
        })
        if (getDetailAnggota === null) {
            return res.status(404).json({
                message: 'Data Tidak ditemukan !'
            })
        }
        const updateAnggota = await Anggota.update({
            nama: nama,
            alamat: alamat,
            nomor_telepon: nomor_telepon,
            email: email
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

anggotaController.delete = async (req, res) => {
    const { id } = req.params
    try {
        const deleteAnggota = await Anggota.destroy({
            where: {
                id: id
            }
        })
        if (!deleteAnggota) {
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

module.exports = anggotaController

