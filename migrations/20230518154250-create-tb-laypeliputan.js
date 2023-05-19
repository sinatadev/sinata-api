'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tb_laypeliputan', {
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
      judul_berita: {
        type: Sequelize.STRING
      },
      kategori: {
        type: Sequelize.STRING
      },
      leaflet_kegiatan: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      disposisi: {
        type: Sequelize.STRING
      },
      jurnalis: {
        type: Sequelize.STRING
      },
      prarilis: {
        type: Sequelize.TEXT
      },
      rilis: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('tb_laypeliputan');
  }
};