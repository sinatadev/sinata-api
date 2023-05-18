'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tb_filedocs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_file: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('tb_filedocs');
  }
};