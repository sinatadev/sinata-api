'use strict';

/** @type {import('sequelize-cli').Migration} */

const now = new Date()

async function generateLayananPembaruanInformasi() {
  const laypeminformasi = [
    {
      id: '41bs551h-8714-44e0-a2fe-45b233f716hb',
      id_account: '326d958b-c313-441a-af4f-b2932e2b52ed',
      judul_permohonan: 'Permohonan Pembaruan Informasi UNS Press di Laman UNS https://uns.ac.id/',
      surat_permohonan: 'surat-permohonan-a.pdf',
      bahan_publikasi: 'bahan-publikasi-a.pdf',
      status: 'Approved & On Progress',
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
