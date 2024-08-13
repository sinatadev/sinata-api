'use strict';

/** @type {import('sequelize-cli').Migration} */

const now = new Date();

async function generateLayananVideotronData() {
  const videotrons = [
    {
      id: 1,
      id_kegiatan: 1,
      bahan_publikasi: 'bahan-publikasi-a.jpg',
      tgl_awal: '2023-05-25 08:00:00',
      tgl_akhir: '2023-06-08 23:59:00',
      id_status: 4,
      disposisi: 'disposisi-a.pdf',
      luaran_layanan: 'dokumentasi-videotron-tayang-a.jpg',
      createdAt: now,
      updatedAt: now,
    },
  ];
  return videotrons;
}
module.exports = {
  async up(queryInterface, Sequelize) {
    const videotrons = await generateLayananVideotronData();
    await queryInterface.bulkInsert('tb_layvideotron', videotrons, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tb_layvideotron', null, {});
  },
};
