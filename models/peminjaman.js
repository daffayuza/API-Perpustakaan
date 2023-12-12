'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Peminjaman extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Peminjaman.belongsTo(models.Buku, { foreignKey: 'id_buku' })
      Peminjaman.belongsTo(models.Anggota, { foreignKey: 'id_anggota', as: 'Peminjam' })
      Peminjaman.hasMany(models.Denda, { foreignKey: 'id_peminjaman' })
    }
  }
  Peminjaman.init({
    id_anggota: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Anggota',
        key: 'id'
      },
      field: 'id_anggota'
    },
    id_buku: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Buku',
        key: 'id'
      },
      field: 'id_buku'
    },
    tanggal_peminjaman: DataTypes.DATE,
    tanggal_pengembalian: DataTypes.DATE,
    denda: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    sequelize,
    modelName: 'Peminjaman',
  });
  return Peminjaman;
};