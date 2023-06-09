'use strict';

/** @type {import('sequelize-cli').Migration} */

const now = new Date()

async function generateLayananPeliputanData() {
  const peliputans = [
    {
      id: '871bat65-8714-44e0-a2fe-45b233f8hb67',
      id_kegiatan: '3dd49c97-8714-44e0-a2fe-45b233f623f5',
      judul_berita: 'Prodi PPKn UNS Gelar Seminar Nasional Bahas Pendidikan Kewarganegaraan untuk Penguatan Karakter Bangsa',
      kategori: 'Kegiatan',
      leaflet_kegiatan: 'leaflet-a.jpg',
      status: 'Complete',
      disposisi: 'disposisi-a.pdf',
      jurnalis: 'Jurnalis 1',
      prarilis: 'Program Studi (Prodi) Pendidikan Kewarganegaraan (PPKn) Fakultas Keguruan dan Ilmu Pendidikan (FKIP) Universitas Sebelas Maret (UNS) Surakarta mengadakan seminar nasional. Acara dengan tema Pendidikan Kewarganegaraan untuk Penguatan Karakter Bangsa di Era Digital ini diselenggarakan secara daring melalui Zoom Meeting dan disiarkan langsung via YouTube Lab PPKn FKIP UNS, Sabtu (2/7/2022).\nAcara dibuka secara resmi oleh Dekan FKIP UNS, Dr. Mardiyana, M.Si. Dr. Mardiyana berharap selepas kegiatan seminar nasional, peserta dapat memiliki rasa kebhinekaan yang kuat, sehingga memunculkan sikap takwa kepada Tuhan, menumbuhkan jiwa toleransi dengan kondisi berbagai rasa, suku, agama yang ada di Indonesia dan menciptakan kemandirian dengan memanfaatkan produk yang dihasilkan masyarakat Indonesia.\nMelalui tema seminar ini juga diharapkan dapat menciptakan mahasiswa untuk berpikir kritis dan kreatif. Sehingga, dapat menghadirkan karakter bangsa yang harus kita ciptakan sesuai dengan program pemerintah. Bahwasanya pendidikan kita harus bisa menciptakan lulusan yang memenuhi produk pancasila, ujar Dr. Mardiyana dalam sambutannya.\nProdi PPKn UNS Gelar Seminar Nasional Bahas Pendidikan Kewarganegaraan untuk Penguatan Karakter Bangsa\nSelanjutnya sambutan Kepala Program Studi PPKn FKIP UNS, Dr. Winarno, S.Pd., M.Si. Dr. Winarno menyampaikan bahwa tema seminar nasional didasari karena pendidikan kewarganegaraan untuk penguatan karakter bangsa sangat dibutuhkan di masa kini.',
      rilis: 'UNS — Program Studi (Prodi) Pendidikan Kewarganegaraan (PPKn) Fakultas Keguruan dan Ilmu Pendidikan (FKIP) Universitas Sebelas Maret (UNS) Surakarta mengadakan seminar nasional. Acara dengan tema Pendidikan Kewarganegaraan untuk Penguatan Karakter Bangsa di Era Digital ini diselenggarakan secara daring melalui Zoom Meeting dan disiarkan langsung via YouTube Lab PPKn FKIP UNS, Sabtu (2/7/2022).\nAcara dibuka secara resmi oleh Dekan FKIP UNS, Dr. Mardiyana, M.Si. Dr. Mardiyana berharap selepas kegiatan seminar nasional, peserta dapat memiliki rasa kebhinekaan yang kuat, sehingga memunculkan sikap takwa kepada Tuhan, menumbuhkan jiwa toleransi dengan kondisi berbagai rasa, suku, agama yang ada di Indonesia dan menciptakan kemandirian dengan memanfaatkan produk yang dihasilkan masyarakat Indonesia.\nMelalui tema seminar ini juga diharapkan dapat menciptakan mahasiswa untuk berpikir kritis dan kreatif. Sehingga, dapat menghadirkan karakter bangsa yang harus kita ciptakan sesuai dengan program pemerintah. Bahwasanya pendidikan kita harus bisa menciptakan lulusan yang memenuhi produk pancasila, ujar Dr. Mardiyana dalam sambutannya.\nProdi PPKn UNS Gelar Seminar Nasional Bahas Pendidikan Kewarganegaraan untuk Penguatan Karakter Bangsa\nSelanjutnya sambutan Kepala Program Studi PPKn FKIP UNS, Dr. Winarno, S.Pd., M.Si. Dr. Winarno menyampaikan bahwa tema seminar nasional didasari karena pendidikan kewarganegaraan untuk penguatan karakter bangsa sangat dibutuhkan di masa kini.\n\nHumas UNS\nReporter: Lina Khoirun Nisa\nEditor: Dwi Hastuti',
      createdAt: now,
      updatedAt: now
    }
  ]
  return peliputans
}
module.exports = {
  async up (queryInterface, Sequelize) {
    const peliputans = await generateLayananPeliputanData()
    await queryInterface.bulkInsert('tb_laypeliputan', peliputans, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tb_laypeliputan', null, {})
  }
};
