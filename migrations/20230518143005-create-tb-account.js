'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tb_account', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      no_identitas: {
        type: Sequelize.STRING
      },
      unit: {
        type: Sequelize.STRING
      },
      token: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.ENUM('User', 'Super Admin', 'Admin Role 1', 'Admin Role 2', 'Admin Role 3', 'Admin Role 4', 'Admin Role 5', 'Admin Role 6', 'Admin Role 7', 'Admin Role 8', 'Admin Role 9'),
        defaultValue: 'User',
      },
      kontak: {
        type: Sequelize.STRING
      },
      img_profil: {
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
    await queryInterface.dropTable('tb_account');
  }
};