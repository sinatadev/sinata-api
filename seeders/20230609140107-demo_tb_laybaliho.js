'use strict';

/** @type {import('sequelize-cli').Migration} */

const now = new Date();

async function generateLayananBalihoData() {
  const balihos = [
    {
      id: 1,
      id_kegiatan: 1,
      bahan_publikasi: 'bahan-publikasi-a.jpg',
      tgl_awal: '2023-05-25 08:00:00',
      tgl_akhir: '2023-06-08 23:59:00',
      bukti_pembayaran: 'bukti-pembayaran-a.jpg',
      id_status: 4,
      disposisi: 'disposisi-a.pdf',
      luaran_layanan: 'dokumentasi-baliho-terpasang-a.jpg',
      createdAt: now,
      updatedAt: now,
    },
  ];
  return balihos;
}
module.exports = {
  async up(queryInterface, Sequelize) {
    const balihos = await generateLayananBalihoData();
    await queryInterface.bulkInsert('tb_laybaliho', balihos, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tb_laybaliho', null, {});
  },
};
