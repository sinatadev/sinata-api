'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tb_laypubagenda', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      id_kegiatan: {
        type: Sequelize.UUID,
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
    await queryInterface.dropTable('tb_laypubagenda');
  }
};