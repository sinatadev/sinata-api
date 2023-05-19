'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tb_laykonpers', {
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
      surat_permohonan: {
        type: Sequelize.STRING
      },
      leaflet_kegiatan: {
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
      status: {
        type: Sequelize.STRING
      },
      disposisi: {
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
    await queryInterface.dropTable('tb_laykonpers');
  }
};