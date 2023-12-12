const { Anggota, Kategori, Penulis, Buku, Peminjaman, Denda } = require("../models")
const peminjamanController = {}

/*
    this is auto generate example, you can continue 

*/
peminjamanController.index = async (req, res) => {
    res.json({
        message: "Hello peminjamanController"
    })
}

peminjamanController.create = async (req, res) => {
    const { id_anggota, id_buku, tanggal_peminjaman, tanggal_pengembalian } = req.body
    if (typeof id_anggota !== 'number' || isNaN(id_anggota) || id_anggota <= 0) {
        return res.status(400).json({ error: 'ID Anggota harus berupa angka dan wajib diisi' });
    }
    if (typeof id_buku !== 'number' || isNaN(id_buku) || id_buku <= 0) {
        return res.status(400).json({ error: 'ID Buku harus berupa angka dan wajib diisi' });
    }
    if (typeof tanggal_peminjaman !== 'string' || tanggal_peminjaman.trim() === '') {
        return res.status(400).json({ error: 'Tanggal Peminjaman harus berupa Huruf dan wajib diisi' });
    }
    if (typeof tanggal_pengembalian !== 'string' || tanggal_pengembalian.trim() === '') {
        return res.status(400).json({ error: 'Tanggal Pengembalian harus berupa Huruf dan wajib diisi' });
    }
    try {
        const getAnggota = await Anggota.findOne({
            where: {
                id: id_anggota,
            },
        });
        const getBuku = await Buku.findOne({
            where: {
                id: id_buku,
            },
        });
        if (getAnggota === null || getBuku === null) {
            return res.status(404).json({
                message: 'Data Tidak ditemukan !'
            });
        } else {
            const createPeminjaman = await Peminjaman.create({
                id_anggota,
                id_buku,
                tanggal_peminjaman,
                tanggal_pengembalian
            })
            return res.status(201).json({
                message: 'Data Berhasil Ditambahkan !'
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        })
    }
}

peminjamanController.getAll = async (req, res) => {
    try {
        const getPeminjaman = await Peminjaman.findAll({
            order: [["createdAt", "DESC"]],
            include: [
                {
                    model: Anggota, as: 'Peminjam'
                },
                {
                    model: Buku,
                    include: [
                        {
                            model: Penulis,
                            as: 'Penulis Buku'
                        },
                        {
                            model: Kategori,
                            as: 'Kategori Buku'
                        }
                    ]
                }
            ]
        })
        return res.status(200).json({
            data: getPeminjaman
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        })
    }
}

peminjamanController.getById = async (req, res) => {
    const { id } = req.params
    try {
        const getDetailPeminjaman = await Peminjaman.findOne({
            where: {
                id: id
            },
            include: [
                {
                    model: Anggota, as: 'Peminjam'
                },
                {
                    model: Buku,
                    include: [
                        {
                            model: Penulis,
                            as: 'Penulis Buku'
                        },
                        {
                            model: Kategori,
                            as: 'Kategori Buku'
                        }
                    ]
                }
            ]
        })
        if (!getDetailPeminjaman) {
            return res.status(404).json({
                message: 'Data Tidak ditemukan !',
            });
        }
        return res.status(200).json({
            data: getDetailPeminjaman
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        })
    }
}

peminjamanController.update = async (req, res) => {
    const { id_anggota, id_buku, tanggal_peminjaman, tanggal_pengembalian } = req.body
    const id = req.params.id
    if (typeof id_anggota !== 'number' || isNaN(id_anggota) || id_anggota <= 0) {
        return res.status(400).json({ error: 'ID Anggota harus berupa angka dan wajib diisi' });
    }
    if (typeof id_buku !== 'number' || isNaN(id_buku) || id_buku <= 0) {
        return res.status(400).json({ error: 'ID Buku harus berupa angka dan wajib diisi' });
    }
    if (typeof tanggal_peminjaman !== 'string' || tanggal_peminjaman.trim() === '') {
        return res.status(400).json({ error: 'Tanggal Peminjaman harus berupa Huruf dan wajib diisi' });
    }
    if (typeof tanggal_pengembalian !== 'string' || tanggal_pengembalian.trim() === '') {
        return res.status(400).json({ error: 'Tanggal Pengembalian harus berupa Huruf dan wajib diisi' });
    }
    try {
        const getDetailPeminjaman = await Peminjaman.findOne({
            where: {
                id: id
            }
        })
        const getAnggota = await Anggota.findOne({
            where: {
                id: id_anggota,
            }
        })
        const getBuku = await Buku.findOne({
            where: {
                id: id_buku,
            }
        })
        if (!getDetailPeminjaman || !getAnggota || !getBuku) {
            return res.status(404).json({
                message: 'Data Tidak ditemukan !'
            })
        }
        const batasWaktuPengembalian = new Date(getDetailPeminjaman.tanggal_pengembalian);
        const tanggalPengembalian = new Date(tanggal_pengembalian);

        if (tanggalPengembalian > batasWaktuPengembalian) {
            const selisihHari = Math.ceil((tanggalPengembalian - batasWaktuPengembalian) / (1000 * 60 * 60 * 24));
            const denda = selisihHari * 1000; // Ganti sesuai dengan aturan denda Anda
            await Peminjaman.update(
                {
                    id_anggota: id_anggota,
                    id_buku: id_buku,
                    tanggal_peminjaman: tanggal_peminjaman,
                    tanggal_pengembalian: tanggal_pengembalian,
                    denda: denda,
                },
                {
                    where: {
                        id: id,
                    },
                }
            );

            return res.status(200).json({
                message: 'Data Berhasil Diubah !',
                denda: denda,
            });
        }


        const updatePeminjaman = await Peminjaman.update({
            id_anggota: id_anggota,
            id_buku: id_buku,
            tanggal_peminjaman: tanggal_peminjaman,
            tanggal_pengembalian: tanggal_pengembalian,
            denda: 0,
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

peminjamanController.pengembalianBuku = async (req, res) => {
    const { id_anggota, id_buku, tanggal_peminjaman, tanggal_pengembalian } = req.body
    const id = req.params.id

    try {
        const peminjaman = await Peminjaman.findByPk(id, {
            include: [
                {
                    model: Buku,
                    include: [
                        {
                            model: Penulis,
                            as: 'Penulis Buku',
                        },
                        {
                            model: Kategori,
                            as: 'Kategori Buku',
                        },
                    ],
                },
            ],
        });

        if (!peminjaman) {
            return res.status(404).json({
                message: 'Data Peminjaman tidak ditemukan!',
            });
        }

        const batasWaktuPengembalian = new Date(peminjaman.tanggal_pengembalian);
        const tanggalPengembalian = new Date(tanggal_pengembalian);

        if (tanggalPengembalian > batasWaktuPengembalian) {
            const selisihHari = Math.ceil((tanggalPengembalian - batasWaktuPengembalian) / (1000 * 60 * 60 * 24));
            const denda = selisihHari * 1000; // Ganti sesuai dengan aturan denda Anda
            await Peminjaman.update(
                {
                    id_anggota: id_anggota,
                    id_buku: id_buku,
                    tanggal_peminjaman: tanggal_peminjaman,
                    tanggal_pengembalian: tanggal_pengembalian,
                    denda: denda,
                },
                {
                    where: {
                        id: id,
                    },
                }
            );

            return res.status(200).json({
                message: 'Buku berhasil dikembalikan!',
                denda: denda,
            });
        }

        await Peminjaman.update(
            {
                tanggal_pengembalian: tanggalPengembalian,
                denda: 0,
            },
            {
                where: {
                    id: id,
                },
            }
        );

        return res.status(200).json({
            message: 'Buku berhasil dikembalikan!',
            denda: 0,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: error.message,
        });
    }
};


peminjamanController.delete = async (req, res) => {
    const { id } = req.params
    try {
        const deletePeminjaman = await Peminjaman.destroy({
            where: {
                id: id
            }
        })
        if (!deletePeminjaman) {
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

module.exports = peminjamanController

