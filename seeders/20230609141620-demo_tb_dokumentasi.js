'use strict';

/** @type {import('sequelize-cli').Migration} */

const now = new Date()

async function generateDokumentasiData() {
  const dokumentasis = [
    {
      id: 1,
      id_kegiatan: 1,
      keterangan: 'Dokumentasi Seminar Nasional Bahas Pendidikan Kewarganegaraan untuk Penguatan Karakter Bangsa\nProgram Studi Pendidikan Kewarganegaraan UNS\n 5 Juni, 2023',
      fotografer: 'Fotografer 1',
      createdAt: now,
      updatedAt: now
    }
  ]
  return dokumentasis
}
module.exports = {
  async up (queryInterface, Sequelize) {
    const dokumentasis = await generateDokumentasiData()
    await queryInterface.bulkInsert('tb_dokumentasi', dokumentasis, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tb_dokumentasi', null, {})
  }
};
