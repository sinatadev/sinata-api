'use strict';

/** @type {import('sequelize-cli').Migration} */

const now = new Date();
const { v4: uuidv4 } = require('uuid');

async function generateAccountData() {
  const accounts = [
    {
      id: uuidv4(),
      username: 'superadmin',
      email: 'superadmin@admin.com',
      name: 'Super Admin',
      password: '$2a$16$3Zt9NiiHUWjl8xjNwTpjOuCTpBonbhXg.jGlqgQTYr5NWfvssy3je', // => password
      no_identitas: '33311237677512',
      unit: 'UPT Humas dan Media',
      role: 'Super Admin',
      kontak: '08888888888',
      img_profil: 'default.jpeg',
      createdAt: now,
      updatedAt: now,
    },
    {
      id: '326d958b-c313-441a-af4f-b2932e2b52ed',
      username: 'usersinata11',
      email: 'usersinata11@user.com',
      name: 'User Sinata 11',
      password: '$2a$16$3Zt9NiiHUWjl8xjNwTpjOuCTpBonbhXg.jGlqgQTYr5NWfvssy3je', // => password
      no_identitas: 'M3119016',
      unit: 'Sekolah Vokasi UNS',
      role: 'User',
      kontak: '085123777786126',
      img_profil: 'default.jpeg',
      createdAt: now,
      updatedAt: now,
    },
  ];
  return accounts;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const accounts = await generateAccountData();
    await queryInterface.bulkInsert('tb_account', accounts, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tb_account', null, {});
  },
};
