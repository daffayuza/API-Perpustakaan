const { Denda, Peminjaman } = require('../models');
const Sequelize = require("sequelize")
const dendaController = {}

/*
    this is auto generate example, you can continue 

*/
dendaController.index = async (req, res) => {
    res.json({
        message: "Hello dendaController"
    })
}

dendaController.create = async (req, res) => {
    const { nominal, tanggal_bayar, id_peminjaman } = req.body;
    if (typeof nominal !== 'number' || isNaN(nominal) || nominal <= 0) {
        return res.status(400).json({ error: 'Nominal harus berupa angka dan wajib diisi' });
    }
    if (typeof tanggal_bayar !== 'string' || tanggal_bayar.trim() === '') {
        return res.status(400).json({ error: 'Tanggal Bayar harus berupa huruf dan wajib diisi' });
    }
    if (typeof id_peminjaman !== 'number' || isNaN(id_peminjaman) || id_peminjaman <= 0) {
        return res.status(400).json({ error: 'ID Peminjaman harus berupa angka dan wajib diisi' });
    }
    try {
        const getPeminjaman = await Peminjaman.findOne({
            where: {
                id: id_peminjaman,
            },
        });

        if (getPeminjaman === null) {
            throw Error('Data Tidak ditemukan !')
        }

        const currentDenda = getPeminjaman.denda;

        // Validasi untuk memastikan pembayaran tidak membuat denda menjadi negatif
        if (nominal < 0 || nominal > currentDenda) {
            return res.status(400).json({
                message: 'Nominal pembayaran tidak valid',
            });
        }

        const newDendaValue = currentDenda - nominal;

        // Set nilai denda pada entri Peminjaman
        await Peminjaman.update(
            {
                denda: newDendaValue,
            },
            {
                where: {
                    id: id_peminjaman,
                },
            }
        )

        const createDenda = await Denda.create({
            nominal,
            tanggal_bayar,
            id_peminjaman,
        })

        return res.status(201).json({
            message: 'Pembayaran Denda Berhasil !',
            sisaDenda: newDendaValue,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        })
    }
}

dendaController.getAll = async (req, res) => {
    try {
        const allDenda = await Denda.findAll({
            include: [
                {
                    model: Peminjaman
                },
            ],
        });

        return res.status(200).json({
            data: allDenda,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: error.message,
        });
    }
};

dendaController.getById = async (req, res) => {
    const { id } = req.params;
    try {
        const denda = await Denda.findByPk(id, {
            include: [
                {
                    model: Peminjaman
                },
            ],
        })

        if (!denda) {
            return res.status(404).json({
                error: 'Data Tidak ditemukan !',
            });
        }

        return res.status(200).json({
            data: denda,
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: error.message,
        })
    }
}

dendaController.update = async (req, res) => {
    const { id } = req.params;
    const { nominal, tanggal_bayar, id_peminjaman } = req.body;
    if (typeof nominal !== 'number' || isNaN(nominal) || nominal <= 0) {
        return res.status(400).json({ error: 'Nominal harus berupa angka dan wajib diisi' });
    }
    if (typeof tanggal_bayar !== 'string' || tanggal_bayar.trim() === '') {
        return res.status(400).json({ error: 'Tanggal Bayar harus berupa huruf dan wajib diisi' });
    }
    if (typeof id_peminjaman !== 'number' || isNaN(id_peminjaman) || id_peminjaman <= 0) {
        return res.status(400).json({ error: 'ID Peminjaman harus berupa angka dan wajib diisi' });
    }
    try {
        const denda = await Denda.findByPk(id);

        if (!denda) {
            return res.status(404).json({
                error: 'Data Tidak ditemukan !',
            });
        }

        const getPeminjaman = await Peminjaman.findByPk(denda.id_peminjaman);

        if (!getPeminjaman) {
            return res.status(404).json({
                error: 'Data Peminjaman Tidak ditemukan !',
            });
        }

        const currentDenda = getPeminjaman.denda;

        // Validasi untuk memastikan pembayaran tidak membuat denda menjadi negatif
        if (nominal < 0 || nominal > currentDenda) {
            return res.status(400).json({
                message: 'Nominal pembayaran tidak valid',
            });
        }

        const newDendaValue = currentDenda - nominal;

        // Set nilai denda pada entri Peminjaman
        await Peminjaman.update(
            {
                denda: newDendaValue,
            },
            {
                where: {
                    id: denda.id_peminjaman,
                },
            }
        );

        // Update entri Denda
        await denda.update({
            nominal,
            tanggal_bayar,
            id_peminjaman,
        });

        return res.status(200).json({
            message: 'Data Berhasil Diubah !',
            sisaDenda: newDendaValue,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: error.message,
        });
    }
};

dendaController.delete = async (req, res) => {
    const { id } = req.params;

    try {
        const denda = await Denda.findByPk(id);

        if (!denda) {
            return res.status(404).json({
                error: 'Data Tidak ditemukan !',
            });
        }

        await denda.destroy();

        return res.status(200).json({
            message: 'Data Berhasil Dihapus !',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: error.message,
        });
    }
};

module.exports = dendaController

