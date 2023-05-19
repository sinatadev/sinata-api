'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tb_laybaliho', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_kegiatan: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tb_kegiatan',
          key: 'id'
        }
      },
      bahan_publikasi: {
        type: Sequelize.STRING
      },
      tgl_awal: {
        type: Sequelize.DATE
      },
      tgl_akhir: {
        type: Sequelize.DATE
      },
      bukti_pembayaran: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      disposisi: {
        type: Sequelize.STRING
      },
      luaran_layanan: {
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
    await queryInterface.dropTable('tb_laybaliho');
  }
};