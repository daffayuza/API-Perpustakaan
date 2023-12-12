'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Peminjamans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_anggota: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Anggota',
          key: 'id'
        }
      },
      id_buku: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Bukus',
          key: 'id'
        }
      },
      tanggal_peminjaman: {
        type: Sequelize.DATE
      },
      tanggal_pengembalian: {
        type: Sequelize.DATE
      },
      denda: {
        type: Sequelize.INTEGER,
        defaultValue: 0  // Default denda pada awalnya 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Peminjamans');
  }
};