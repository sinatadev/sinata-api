'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tb_laypubagendas', {
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
      leaflet_kegiatan: {
        type: Sequelize.STRING
      },
      caption: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('tb_laypubagendas');
  }
};