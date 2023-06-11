'use strict';

/** @type {import('sequelize-cli').Migration} */

const now = new Date()

async function generateLayananPeliputanData() {
  const peliputans = [
    {
      id: '871bat65-8714-44e0-a2fe-45b233f8hb67',
      id_kegiatan: '3dd49c97-8714-44e0-a2fe-45b233f623f5',
      leaflet_kegiatan: 'leaflet-a.jpg',
      status: 'Complete',
      disposisi: 'disposisi-a.pdf',
      keterangan: 'Keterangan tambahan',
      createdAt: now,
      updatedAt: now
    }
  ]
  return peliputans
}
module.exports = {
  async up (queryInterface, Sequelize) {
    const peliputans = await generateLayananPeliputanData()
    await queryInterface.bulkInsert('tb_laypeliputan', peliputans, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tb_laypeliputan', null, {})
  }
};
