'use strict';

/** @type {import('sequelize-cli').Migration} */

const now = new Date()

async function generateFileDokumentasi() {
  const files = [
    {
      id: 1,
      id_dokumentasi: 1,
      nama_file: 'file-1.jpg',
      tipe_file: 'jpg',
      size_file: 528,
      createdAt: now,
      updatedAt: now
    },
    {
      id: 2,
      id_dokumentasi: 1,
      nama_file: 'file-2.jpg',
      tipe_file: 'jpg',
      size_file: 321,
      createdAt: now,
      updatedAt: now
    }
  ]
  return files
}
module.exports = {
  async up (queryInterface, Sequelize) {
    const files = await generateFileDokumentasi()
    await queryInterface.bulkInsert('tb_filedoc', files, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tb_filedoc', null, {}) 
  }
};
