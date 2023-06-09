'use strict';

/** @type {import('sequelize-cli').Migration} */

const now = new Date()

async function generateFileDokumentasi() {
  const files = [
    {
      id: '97habz21-c313-441a-af4f-v8122e898vz4',
      id_dokumentasi: '5gba612h-c313-441a-af4f-b2932e87bha5',
      nama_file: 'file-1.jpg',
      tipe_file: 'jpg',
      size_file: 528,
      createdAt: now,
      updatedAt: now
    },
    {
      id: '2hbayk73-c313-441a-af4f-v8122e98bh16',
      id_dokumentasi: '5gba612h-c313-441a-af4f-b2932e87bha5',
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
