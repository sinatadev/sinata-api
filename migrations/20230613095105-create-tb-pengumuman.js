'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'tb_pengumuman',
      {
          id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER
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
        is_active: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: true,
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
