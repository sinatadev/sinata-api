'use strict';

/** @type {import('sequelize-cli').Migration} */

const now = new Date()

async function generateLayananPembaruanInformasi() {
  const laypeminformasi = [
    {
      id: 1,
      id_account: 2,
      judul_permohonan: 'Permohonan Pembaruan Informasi UNS Press di Laman UNS https://uns.ac.id/',
      surat_permohonan: 'surat-permohonan-a.pdf',
      bahan_publikasi: 'bahan-publikasi-a.pdf',
      id_status: 2,
      disposisi: 'disposisi-a.pdf',
      luaran_layanan: '',
      createdAt: now,
      updatedAt: now
    }
  ]
  return laypeminformasi
}
module.exports = {
  async up (queryInterface, Sequelize) {
    const laypeminformasi = await generateLayananPembaruanInformasi()
    await queryInterface.bulkInsert('tb_laypeminformasi', laypeminformasi, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tb_laypeminformasi', null, {})
  }
};
