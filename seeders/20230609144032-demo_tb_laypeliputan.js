'use strict';

/** @type {import('sequelize-cli').Migration} */

const now = new Date();

async function generateLayananPeliputanData() {
  const peliputans = [
    {
      id: 1,
      id_kegiatan: 1,
      leaflet_kegiatan: 'leaflet-a.jpg',
      id_status: 4,
      disposisi: 'disposisi-a.pdf',
      keterangan: 'Keterangan tambahan',
      createdAt: now,
      updatedAt: now,
    },
  ];
  return peliputans;
}
module.exports = {
  async up(queryInterface, Sequelize) {
    const peliputans = await generateLayananPeliputanData();
    await queryInterface.bulkInsert('tb_laypeliputan', peliputans, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tb_laypeliputan', null, {});
  },
};
