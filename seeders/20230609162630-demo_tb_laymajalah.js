'use strict';

/** @type {import('sequelize-cli').Migration} */

const now = new Date()

async function generateLayananMajalahData() {
  const majalahs = [
    {
      id: '4jbb7hg1-8714-8hb6-8b6g-45b2338hb65g',
      id_kegiatan: '3dd49c97-8714-44e0-a2fe-45b233f623f5',
      bahan_publikasi: 'bahan-publikasi-a.docx',
      status: 'Complete',
      disposisi: 'disposisi-a.pdf',
      luaran_layanan: 'dokumentasi-publikasi-telah-tercetak-di-majalah.jpg',
      createdAt: now,
      updatedAt: now
    }
  ]
  return majalahs
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const majalahs = await generateLayananMajalahData()
    await queryInterface.bulkInsert('tb_laymajalah', majalahs, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tb_laymajalah', null, {})
  }
};
