'use strict';

/** @type {import('sequelize-cli').Migration} */

const now = new Date();

async function generateLayananMajalahData() {
  const majalahs = [
    {
      id: 1,
      id_kegiatan: 1,
      bahan_publikasi: 'bahan-publikasi-a.docx',
      id_status: 4,
      disposisi: 'disposisi-a.pdf',
      luaran_layanan: 'dokumentasi-publikasi-telah-tercetak-di-majalah.jpg',
      createdAt: now,
      updatedAt: now,
    },
  ];
  return majalahs;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const majalahs = await generateLayananMajalahData();
    await queryInterface.bulkInsert('tb_laymajalah', majalahs, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tb_laymajalah', null, {});
  },
};
