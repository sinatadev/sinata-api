'use strict';

/** @type {import('sequelize-cli').Migration} */

const now = new Date()

async function generateKegiatanData() {
  const kegiatans = [
    {
      id: '3dd49c97-8714-44e0-a2fe-45b233f623f5',
      id_account: '326d958b-c313-441a-af4f-b2932e2b52ed',
      judul_kegiatan: 'Seminar Nasional Bahas Pendidikan Kewarganegaraan untuk Penguatan Karakter Bangsa',
      des_kegiatan: 'Seminar Nasional Pendidikan Kewarganegaraan UNS',
      sifat_kegiatan: 'Terbuka',
      tgl_kegiatan: '2022-07-04 08:24:18',
      waktu_kegiatan: '2022-07-04 08:24:18',
      tempat_kegiatan: 'Gedung A FKIP UNS, Kentingan',
      surat_permohonan: 'file-a.pdf',
      sik: 'sik-a.pdf',
      createdAt: now,
      updatedAt: now
    }
  ]
  return kegiatans
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const kegiatans = await generateKegiatanData()
    await queryInterface.bulkInsert('tb_kegiatan', kegiatans, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tb_kegiatan', null, {});
  }
};
