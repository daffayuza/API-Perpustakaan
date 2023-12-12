const { Penulis, Kategori, Buku } = require('../models');

const bukuController = {};

/*
    this is auto generate example, you can continue 

*/
bukuController.index = async (req, res) => {
  res.json({
    message: 'Hello bukuController',
  });
};

bukuController.create = async (req, res) => {
  const { judul, id_penulis, penerbit, tahun_terbit, jumlah_salinan, id_kategori } = req.body;
  if (typeof judul !== 'string' || judul.trim() === '') {
    return res.status(400).json({ error: 'Judul harus berupa huruf dan wajib diisi' });
  }
  if (typeof id_penulis !== 'number' || isNaN(id_penulis) || id_penulis <= 0) {
    return res.status(400).json({ error: 'ID Penulis harus berupa angka dan wajib diisi' });
  }
  if (typeof penerbit !== 'string' || penerbit.trim() === '') {
    return res.status(400).json({ error: 'Penerbit harus berupa Huruf dan wajib diisi' });
  }
  if (typeof tahun_terbit !== 'number' || isNaN(tahun_terbit) || tahun_terbit <= 0) {
    return res.status(400).json({ error: 'Tahun Terbit harus berupa angka dan wajib diisi' });
  }
  if (typeof jumlah_salinan !== 'number' || isNaN(jumlah_salinan) || jumlah_salinan <= 0) {
    return res.status(400).json({ error: 'Jumlah Salinan harus berupa angka dan wajib diisi' });
  }
  if (typeof id_kategori !== 'number' || isNaN(id_kategori) || id_kategori <= 0) {
    return res.status(400).json({ error: 'ID Kategori harus berupa angka dan wajib diisi' });
  }
  try {
    const getPenulis = await Penulis.findOne({
      where: {
        id: id_penulis,
      },
    });
    const getKategori = await Kategori.findOne({
      where: {
        id: id_kategori,
      },
    });
    if (getPenulis === null || getKategori === null) {
      throw Error('Data Tidak ditemukan !');
    } else {
      const createBuku = await Buku.create({
        judul,
        id_penulis,
        penerbit,
        tahun_terbit,
        jumlah_salinan,
        id_kategori,
      });
      return res.status(201).json({
        message: 'Data berhasil ditambahkan !',
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    })
  }
}

bukuController.getAll = async (req, res) => {
  try {
    const getBuku = await Buku.findAll({
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
    });
    return res.status(200).json({
      data: getBuku,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    })
  }
}

bukuController.getById = async (req, res) => {
  const { id } = req.params;

  try {
    const getBuku = await Buku.findOne({
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
      where: {
        id: id,
      },
    });
    if (!getBuku) {
      return res.status(404).json({
        message: 'Data Tidak ditemukan !',
      });
    }
    return res.status(200).json({
      data: getBuku,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    })
  }
}

bukuController.update = async (req, res) => {
  const { judul, id_penulis, penerbit, tahun_terbit, jumlah_salinan, id_kategori } = req.body;
  const { id } = req.params;
  if (typeof judul !== 'string' || judul.trim() === '') {
    return res.status(400).json({ error: 'Judul harus berupa huruf dan wajib diisi' });
  }
  if (typeof id_penulis !== 'number' || isNaN(id_penulis) || id_penulis <= 0) {
    return res.status(400).json({ error: 'ID Penulis harus berupa angka dan wajib diisi' });
  }
  if (typeof penerbit !== 'string' || penerbit.trim() === '') {
    return res.status(400).json({ error: 'Penerbit harus berupa Huruf dan wajib diisi' });
  }
  if (typeof tahun_terbit !== 'number' || isNaN(tahun_terbit) || tahun_terbit <= 0) {
    return res.status(400).json({ error: 'Tahun Terbit harus berupa angka dan wajib diisi' });
  }
  if (typeof jumlah_salinan !== 'number' || isNaN(jumlah_salinan) || jumlah_salinan <= 0) {
    return res.status(400).json({ error: 'Jumlah Salinan harus berupa angka dan wajib diisi' });
  }
  if (typeof id_kategori !== 'number' || isNaN(id_kategori) || id_kategori <= 0) {
    return res.status(400).json({ error: 'ID Kategori harus berupa angka dan wajib diisi' });
  }
  try {
    const getBuku = await Buku.findOne({
      where: {
        id,
      },
    });
    const getPenulis = await Penulis.findOne({
      where: {
        id: id_penulis,
      },
    });
    const getKategori = await Kategori.findOne({
      where: {
        id: id_kategori,
      },
    });
    if (!getBuku || !getPenulis || !getKategori) {
      return res.status(404).json({
        message: 'Data tidak ditemukan!'
      })
    } else {
      const createBuku = await Buku.update(
        {
          judul,
          id_penulis,
          penerbit,
          tahun_terbit,
          jumlah_salinan,
          id_kategori,
        },
        {
          where: {
            id,
          },
        }
      );
      return res.status(201).json({
        message: 'Data berhasil diubah !',
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    })
  }
}

bukuController.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteBuku = await Buku.destroy({
      where: {
        id,
      },
    });
    if (!deleteBuku) {
      return res.status(404).json({
        message: 'Data tidak ditemukan!'
      })
    }
    return res.status(200).json({
      message: 'Data berhasil dihapus !',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    })
  }
}

module.exports = bukuController;
