'use strict';

/** @type {import('sequelize-cli').Migration} */

const now = new Date()

async function generateArsipPers() {
  const arsipPers = [
    {
      id: '32bhytg6-8714-44e0-a2fe-45b233fj76gb',
      id_peliputan: '871bat65-8714-44e0-a2fe-45b233f8hb67',
      no_rilis: '10/HUMAS/UNS/VII/2022',
      judul_berita: 'Prodi PPKn UNS Gelar Seminar Nasional Bahas Pendidikan Kewarganegaraan untuk Penguatan Karakter Bangsa',
      kategori: 'Kegiatan',
      jurnalis: 'Jurnalis 1',
      prarilis: 'Program Studi (Prodi) Pendidikan Kewarganegaraan (PPKn) Fakultas Keguruan dan Ilmu Pendidikan (FKIP) Universitas Sebelas Maret (UNS) Surakarta mengadakan seminar nasional. Acara dengan tema Pendidikan Kewarganegaraan untuk Penguatan Karakter Bangsa di Era Digital ini diselenggarakan secara daring melalui Zoom Meeting dan disiarkan langsung via YouTube Lab PPKn FKIP UNS, Sabtu (2/7/2022).\nAcara dibuka secara resmi oleh Dekan FKIP UNS, Dr. Mardiyana, M.Si. Dr. Mardiyana berharap selepas kegiatan seminar nasional, peserta dapat memiliki rasa kebhinekaan yang kuat, sehingga memunculkan sikap takwa kepada Tuhan, menumbuhkan jiwa toleransi dengan kondisi berbagai rasa, suku, agama yang ada di Indonesia dan menciptakan kemandirian dengan memanfaatkan produk yang dihasilkan masyarakat Indonesia.\nMelalui tema seminar ini juga diharapkan dapat menciptakan mahasiswa untuk berpikir kritis dan kreatif. Sehingga, dapat menghadirkan karakter bangsa yang harus kita ciptakan sesuai dengan program pemerintah. Bahwasanya pendidikan kita harus bisa menciptakan lulusan yang memenuhi produk pancasila, ujar Dr. Mardiyana dalam sambutannya.\nProdi PPKn UNS Gelar Seminar Nasional Bahas Pendidikan Kewarganegaraan untuk Penguatan Karakter Bangsa\nSelanjutnya sambutan Kepala Program Studi PPKn FKIP UNS, Dr. Winarno, S.Pd., M.Si. Dr. Winarno menyampaikan bahwa tema seminar nasional didasari karena pendidikan kewarganegaraan untuk penguatan karakter bangsa sangat dibutuhkan di masa kini.',
      rilis: 'UNS — Program Studi (Prodi) Pendidikan Kewarganegaraan (PPKn) Fakultas Keguruan dan Ilmu Pendidikan (FKIP) Universitas Sebelas Maret (UNS) Surakarta mengadakan seminar nasional. Acara dengan tema Pendidikan Kewarganegaraan untuk Penguatan Karakter Bangsa di Era Digital ini diselenggarakan secara daring melalui Zoom Meeting dan disiarkan langsung via YouTube Lab PPKn FKIP UNS, Sabtu (2/7/2022).\nAcara dibuka secara resmi oleh Dekan FKIP UNS, Dr. Mardiyana, M.Si. Dr. Mardiyana berharap selepas kegiatan seminar nasional, peserta dapat memiliki rasa kebhinekaan yang kuat, sehingga memunculkan sikap takwa kepada Tuhan, menumbuhkan jiwa toleransi dengan kondisi berbagai rasa, suku, agama yang ada di Indonesia dan menciptakan kemandirian dengan memanfaatkan produk yang dihasilkan masyarakat Indonesia.\nMelalui tema seminar ini juga diharapkan dapat menciptakan mahasiswa untuk berpikir kritis dan kreatif. Sehingga, dapat menghadirkan karakter bangsa yang harus kita ciptakan sesuai dengan program pemerintah. Bahwasanya pendidikan kita harus bisa menciptakan lulusan yang memenuhi produk pancasila, ujar Dr. Mardiyana dalam sambutannya.\nProdi PPKn UNS Gelar Seminar Nasional Bahas Pendidikan Kewarganegaraan untuk Penguatan Karakter Bangsa\nSelanjutnya sambutan Kepala Program Studi PPKn FKIP UNS, Dr. Winarno, S.Pd., M.Si. Dr. Winarno menyampaikan bahwa tema seminar nasional didasari karena pendidikan kewarganegaraan untuk penguatan karakter bangsa sangat dibutuhkan di masa kini.\n\nHumas UNS\nReporter: Lina Khoirun Nisa\nEditor: Dwi Hastuti',
      tgl_upload: '2022-07-04 16:40:00',
      waktu_upload: '2022-07-04 16:40:00',
      admin: 'Admin 1',
      link_berita: 'https://uns.ac.id/id/uns-update/prodi-ppkn-uns-gelar-seminar-nasional-bahas-pendidikan-kewarganegaraan-untuk-penguatan-karakter-bangsa.html',
      judul_terjemahan: 'PPKn UNS Study Program Holds National Seminar on Citizenship Education to Strengthen National Character',
      penerjemah: 'Penerjemah 1',
      naskah_terj: 'UNS — Citizenship Education Study Program (PPKn) Faculty of Teacher Training and Education (FKIP) Sebelas Maret University (UNS) Surakarta held a national seminar. The event with the theme Citizenship Education for Strengthening National Character in the Digital Age was held online through a Zoom Meeting and broadcast live via YouTube Lab PPKn FKIP UNS, Saturday (2/7/2022). Mardiyana, M.Sc. Dr. Mardiyana hopes that after the national seminar activities, the participants will have a strong sense of diversity, thereby creating an attitude of piety to God, cultivating a spirit of tolerance with conditions of various tastes, ethnicities, religions in Indonesia and creating self-reliance by utilizing products produced by Indonesian people. The seminar theme is also expected to create students to think critically and creatively. So, we can present the national character that we have to create in accordance with government programs. That our education must be able to produce graduates who fulfill Pancasila products, said Dr. Mardiyana in his speech.\nPPKn UNS Study Program Holds National Seminar on Citizenship Education to Strengthen National Character\nFollowing the remarks from the Head of the PPKn Study Program FKIP UNS, Dr. Winarno, S.Pd., M.Si. Dr. Winarno said that the theme of the national seminar was based on citizenship education to strengthen national character which is needed nowadays.\n\nUNS Public Relations\nReporter: Lina Khoirun Nisa\nEditor: Dwi Hastuti',
      tgl_upload_terj: '2022-07-05 13:26:00',
      waktu_upload_terj: '2022-07-05 13:26:00',
      admin_terj: 'Admin 1',
      link_terj: 'https://uns.ac.id/en/uns-update/uhasd7123b',
      status_publikasi: 'Selesai',
      createdAt: now,
      updatedAt: now
    }
  ]
  return arsipPers
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const arsipPers = await generateArsipPers()
    await queryInterface.bulkInsert('tb_arsip_pers', arsipPers, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tb_arsip_pers', null, {})
  }
};
