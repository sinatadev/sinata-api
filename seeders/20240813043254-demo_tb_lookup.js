'use strict';

/** @type {import('sequelize-cli').Migration} */

const now = new Date();

function generateLookup() {
  const lookups = [
    {
      id: 1,
      type: 'MenuType',
      name: 'Level 1',
      value: 1,
      description: 'Menu Type Level 1',
      createdAt: now,
      createdBy: 1,
      updatedBy: null,
      is_active: true,
    },
    {
      id: 2,
      type: 'MenuType',
      name: 'Level 2',
      value: 2,
      description: 'Menu Type Level 2',
      createdAt: now,
      createdBy: 1,
      updatedBy: null,
      is_active: true,
    },
    {
      id: 3,
      type: 'MenuType',
      name: 'Level 3',
      value: 3,
      description: 'Menu Type Level 3',
      createdAt: now,
      createdBy: 1,
      updatedBy: null,
      is_active: true,
    },
  ]
  return lookups;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const lookups = await generateLookup()
    await queryInterface.bulkInsert('tb_lookup', lookups, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tb_lookup', null, {})
  }
};
