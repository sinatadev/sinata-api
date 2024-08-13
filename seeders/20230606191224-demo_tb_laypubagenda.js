'use strict';

/** @type {import('sequelize-cli').Migration} */

const now = new Date();

async function generatePublikasiAgenda() {
  const agendas = [
    {
      id: 1,
      id_kegiatan: 1,
      leaflet_kegiatan: 'leaflet-a.jpg',
      caption:
        'Seminar Nasional Bahas Pendidikan Kewarganegaraan untuk Penguatan Karakter Bangsa',
      id_status: 4,
      disposisi: 'disposisi-a.pdf',
      luaran_layanan:
        'Agenda ini sudah berhasil terpublikasi. \nSilakan buka pada link berikut \nhttps://test.com/test/123',
      createdAt: now,
      updatedAt: now,
    },
  ];
  return agendas;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const agendas = await generatePublikasiAgenda();
    await queryInterface.bulkInsert('tb_laypubagenda', agendas, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tb_laypubagenda', null, {});
  },
};
