'use strict';

/** @type {import('sequelize-cli').Migration} */

const now = new Date()

async function generateOpiniData() {
  const opini = [
    {
      id: '7hb9kma6-c313-441a-af4f-b2932e2876ba',
      id_account: '326d958b-c313-441a-af4f-b2932e2b52ed',
      judul_pembahasan: 'Resolusi PPDB SMA 2023 Berdasar Keberpihakan pada Siswa',
      surat_permohonan: 'surat-permohonan-a.pdf',
      foto_penulis: 'Atiek Rachmawati',
      bahan_publikasi: 'bahan-publikasi-a.pdf',
      status: 'Complete',
      disposisi: 'disposisi-a.pdf',
      tgl_waktu_upload: '2022-07-04 14:58:12',
      admin: 'Admin 1',
      link_berita: 'https://uns.ac.id/id/uns-opinion/17263basd',
      penerjemah: 'Penerjemah 1',
      tgl_waktu_upload_terj: '2022-07-05 07:58:12',
      admin_terj: 'Admin 1',
      link_terj: 'https://uns.ac.id/en/uns-opinion/7123nnasd',
      createdAt: now,
      updatedAt: now
    }
  ]
  return opini
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const opini = await generateOpiniData()
    await queryInterface.bulkInsert('tb_opini', opini, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tb_opini', null, {})
  }
};
