'use strict';

/** @type {import('sequelize-cli').Migration} */

const now = new Date();

async function generateOpiniData() {
  const opini = [
    {
      id: 1,
      id_account: 2,
      judul_pembahasan:
        'Resolusi PPDB SMA 2023 Berdasar Keberpihakan pada Siswa',
      surat_permohonan: 'surat-permohonan-a.pdf',
      foto_penulis: 'foto-penulis-a.jpg',
      bahan_publikasi: 'bahan-publikasi-a.pdf',
      id_status: 4,
      disposisi: 'disposisi-a.pdf',
      tgl_waktu_upload: '2022-07-04 14:58:12',
      admin: 'Super Admin',
      link_berita: 'https://uns.ac.id/id/uns-opinion/17263basd',
      penerjemah: 'Super Admin',
      tgl_waktu_upload_terj: '2022-07-05 07:58:12',
      admin_terj: 'Super Admin',
      link_terj: 'https://uns.ac.id/en/uns-opinion/7123nnasd',
      createdAt: now,
      updatedAt: now,
    },
  ];
  return opini;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const opini = await generateOpiniData();
    await queryInterface.bulkInsert('tb_opini', opini, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tb_opini', null, {});
  },
};
