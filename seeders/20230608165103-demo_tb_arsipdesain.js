'use strict';

/** @type {import('sequelize-cli').Migration} */

const now = new Date()

async function generateArsipDesainData() {
  const arsipDesain = [
    {
      id: '87zhga12-c313-441a-af4f-b2932e21bhy6',
      id_account: '326d958b-c313-441a-af4f-b2932e2b52ed',
      judul_desain: 'Leaflet Sholat Idul Adha 1443 Hijriyah, Kantor Pusat UNS',
      kategori: 'Leaflet',
      keterangan: 'Leaflet Sholat Idul Adha 1443 Hijriyah, Kantor Pusat UNS.',
      deadline: '2022-07-07 23:59:00',
      status: 'Approved & On Progress',
      lampiran_file: 'desain-sholat-idul-adha.zip',
      createdAt: now,
      updatedAt: now
    }
  ]
  return arsipDesain
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const arsipDesain = await generateArsipDesainData()
    await queryInterface.bulkInsert('tb_arsipdesain', arsipDesain, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tb_arsipdesain', null, {})
  }
};
