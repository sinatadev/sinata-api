'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'tb_account',
      {
          id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER
          },
        username: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
        },
        name: {
          type: Sequelize.STRING,
        },
        password: {
          type: Sequelize.STRING,
        },
        no_identitas: {
          type: Sequelize.STRING,
        },
        unit: {
          type: Sequelize.STRING,
        },
        id_role: {
          type: Sequelize.INTEGER,
          defaultValue: 1,
        },
        kontak: {
          type: Sequelize.STRING,
        },
        img_profil: {
          type: Sequelize.STRING,
          defaultValue: 'default.jpeg',
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
    await queryInterface.dropTable('tb_account');
  },
};
