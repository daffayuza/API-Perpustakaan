'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Anggota extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Anggota.hasMany(models.Peminjaman, { foreignKey: 'id_anggota' })
    }
  }
  Anggota.init({
    nama: DataTypes.STRING,
    alamat: DataTypes.STRING,
    nomor_telepon: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Anggota',
  });
  return Anggota;
};