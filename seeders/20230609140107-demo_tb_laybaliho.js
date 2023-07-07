'use strict';

/** @type {import('sequelize-cli').Migration} */

const now = new Date();

async function generateLayananBalihoData() {
  const balihos = [
    {
      id: '86bg541s-8714-44e0-a2fe-45b233f6bh87',
      id_kegiatan: '3dd49c97-8714-44e0-a2fe-45b233f623f5',
      bahan_publikasi: 'bahan-publikasi-a.jpg',
      tgl_awal: '2023-05-25 08:00:00',
      tgl_akhir: '2023-06-08 23:59:00',
      bukti_pembayaran: 'bukti-pembayaran-a.jpg',
      status: 'Completed',
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
