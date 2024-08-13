'use strict';

/** @type {import('sequelize-cli').Migration} */

const now = new Date();

function generateNavigation() {
  var menus = [
    {
      id: 1,
      name: 'Dashboard',
      type: 1,
      route: '/dashboard',
      icon: 'fa-solid fa-house',
      orderBy: 1,
      createdBy: 1,
      createdAt: now,
      is_active: true,
    },
    {
      id: 2,
      name: 'Manajemen Kegiatan',
      type: 1,
      route: '#',
      icon: 'fa-solid fa-clipboard-list',
      orderBy: 2,
      createdBy: 1,
      createdAt: now,
      is_active: true,
    },
    {
      id: 3,
      name: 'Daftar Kegiatan',
      type: 2,
      route: 'daftar-kegiatan',
      icon: null,
      orderBy: 1,
      createdBy: 1,
      createdAt: now,
      is_active: true,
    },
    {
      id: 4,
      name: 'Daftar Agenda Terpublikasi',
      type: 2,
      route: 'daftar-agenda',
      icon: null,
      orderBy: 2,
      createdBy: 1,
      createdAt: now,
      is_active: true,
    },
  ]
  return menus;
}
module.exports = {
  async up (queryInterface, Sequelize) {
    const roles = await generateNavigation()
    await queryInterface.bulkInsert('tb_navigation', roles, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tb_navigation', null, {})
  }
};
