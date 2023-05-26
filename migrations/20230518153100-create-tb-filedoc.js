'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tb_filedoc', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      id_file: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'tb_dokumentasi',
          key: 'id'
        }
      },
      nama_file: {
        type: Sequelize.STRING
      },
      tipe_file: {
        type: Sequelize.STRING
      },
      size_file: {
        type: Sequelize.INTEGER
      },
      data_file: {
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
    await queryInterface.dropTable('tb_filedoc');
  }
};