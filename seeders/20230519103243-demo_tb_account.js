'use strict';

/** @type {import('sequelize-cli').Migration} */

const now = new Date();

async function generateAccountData() {
  const accounts = [
    {
      id: 1,
      username: 'superadmin',
      email: 'superadmin@admin.com',
      name: 'Super Admin',
      password: '$2a$16$3Zt9NiiHUWjl8xjNwTpjOuCTpBonbhXg.jGlqgQTYr5NWfvssy3je', // => password
      no_identitas: '33311237677512',
      unit: 'UPT Humas dan Media',
      id_role: 3,
      kontak: '08888888888',
      img_profil: 'default.jpeg',
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 2,
      username: 'usersinata11',
      email: 'usersinata11@user.com',
      name: 'User Sinata 11',
      password: '$2a$16$3Zt9NiiHUWjl8xjNwTpjOuCTpBonbhXg.jGlqgQTYr5NWfvssy3je', // => password
      no_identitas: 'M3119016',
      unit: 'Sekolah Vokasi UNS',
      id_role: 1,
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
