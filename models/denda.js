'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Denda extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Denda.belongsTo(models.Peminjaman, { foreignKey: 'id_peminjaman' });
    }
  }
  Denda.init({
    nominal: DataTypes.FLOAT,
    tanggal_bayar: DataTypes.DATE,
    id_peminjaman: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Peminjaman',
        key: 'id'
      },
      field: 'id_peminjaman'
    },
  }, {
    sequelize,
    modelName: 'Denda',
  });
  return Denda;
};