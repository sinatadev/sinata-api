'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tb_kegiatan', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_account: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tb_account',
          key: 'id'
        }
      },
      judul_kegiatan: {
        type: Sequelize.STRING
      },
      des_kegiatan: {
        type: Sequelize.TEXT
      },
      sifat_kegiatan: {
        type: Sequelize.STRING
      },
      tgl_kegiatan: {
        type: Sequelize.DATE
      },
      waktu_kegiatan: {
        type: Sequelize.TIME
      },
      tempat_kegiatan: {
        type: Sequelize.STRING
      },
      surat_permohonan: {
        type: Sequelize.STRING
      },
      sik: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('tb_kegiatan');
  }
};