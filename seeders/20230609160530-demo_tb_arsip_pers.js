'use strict';

/** @type {import('sequelize-cli').Migration} */

const now = new Date()

async function generateArsipPers() {
  const arsipPers = [
    {
      id: '32bhytg6-8714-44e0-a2fe-45b233fj76gb',
      id_peliputan: '871bat65-8714-44e0-a2fe-45b233f8hb67',
      no_rilis: '10/HUMAS/UNS/VII/2022',
      tgl_upload: '2022-07-04 16:40:00',
      waktu_upload: '2022-07-04 16:40:00',
      admin: 'Admin 1',
      link_berita: 'https://uns.ac.id/id/uns-update/prodi-ppkn-uns-gelar-seminar-nasional-bahas-pendidikan-kewarganegaraan-untuk-penguatan-karakter-bangsa.html',
      penerjemah: 'Penerjemah 1',
      judul_terjemahan: 'PPKn UNS Study Program Holds National Seminar on Citizenship Education to Strengthen National Character',
      tgl_upload_terj: '2022-07-05 13:26:00',
      waktu_upload_terj: '2022-07-05 13:26:00',
      admin_terj: 'Admin 1',
      link_terj: 'https://uns.ac.id/en/uns-update/uhasd7123b',
      status: 'Selesai',
      createdAt: now,
      updatedAt: now
    }
  ]
  return arsipPers
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const arsipPers = await generateArsipPers()
    await queryInterface.bulkInsert('tb_arsip_pers', arsipPers, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tb_arsip_pers', null, {})
  }
};
