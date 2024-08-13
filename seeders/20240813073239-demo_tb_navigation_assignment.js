'use strict';

/** @type {import('sequelize-cli').Migration} */

const now = new Date();

function generateNavigationAssignment() {
  var nassignment = [
    {
      id: 1,
      id_navigation: 1,
      id_role: 1,
      createdBy: 1,
      createdAt: now,
      is_active: true
    },
    {
      id: 2,
      id_navigation: 1,
      id_role: 2,
      createdBy: 1,
      createdAt: now,
      is_active: true
    },
    {
      id: 3,
      id_navigation: 1,
      id_role: 3,
      createdBy: 1,
      createdAt: now,
      is_active: true
    },
    {
      id: 4,
      id_navigation: 2,
      id_role: 2,
      createdBy: 1,
      createdAt: now,
      is_active: true
    },
    {
      id: 5,
      id_navigation: 2,
      id_role: 3,
      createdBy: 1,
      createdAt: now,
      is_active: true
    },
    {
      id: 6,
      id_navigation: 3,
      id_role: 2,
      createdBy: 1,
      createdAt: now,
      is_active: true
    },
    {
      id: 7,
      id_navigation: 3,
      id_role: 3,
      createdBy: 1,
      createdAt: now,
      is_active: true
    },
  ]
  return nassignment;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const na = await generateNavigationAssignment()
    await queryInterface.bulkInsert('tb_navigation_assignment', na, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tb_navigation_assignment', null, {})
  }
};
