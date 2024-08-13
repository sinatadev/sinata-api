'use strict';

/** @type {import('sequelize-cli').Migration} */

const now = new Date();

function generateRole() {
  var roles = [
    {
      id: 1,
      name: 'User',
      description: 'Role for User',
      createdBy: 1,
      is_active: true,
      createdAt: now
    },
    {
      id: 2,
      name: 'Admin',
      description: 'Role for User',
      createdBy: 1,
      is_active: true,
      createdAt: now
    },
    {
      id: 3,
      name: 'Super Admin',
      description: 'Role for User',
      createdBy: 1,
      is_active: true,
      createdAt: now
    }
  ]
  return roles;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const roles = await generateRole()
    await queryInterface.bulkInsert('tb_role', roles, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tb_role', null, {})
  }
};
