'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'tb_pengumuman',
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
        judul_pengumuman: {
          type: Sequelize.STRING,
        },
        tgl_upload: {
          type: Sequelize.DATE,
        },
        content: {
          type: Sequelize.TEXT,
        },
        status: {
          type: Sequelize.ENUM('Active', 'Inactive'),
          defaultValue: 'Active',
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        freezeTableName: true,
      },
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tb_pengumuman');
  },
};
