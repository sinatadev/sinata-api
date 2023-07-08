'use strict';

/** @type {import('sequelize-cli').Migration} */

const now = new Date();

async function generateLayananKonpersData() {
  const laykonpers = [
    {
      id: '76asd6hg-c313-441a-af4f-b2932e2b776d',
      id_account: '326d958b-c313-441a-af4f-b2932e2b52ed',
      judul_kegiatan: 'Konferensi Pers Penerimaan SNMPTN UNS 2022',
      surat_permohonan: 'surat-permohonan-a.pdf',
      leaflet_kegiatan: 'leaflet-a.jpg',
      tgl_kegiatan: '2022-03-29 08:00:00',
      waktu_kegiatan: '2022-03-29 08:00:00',
      tempat_kegiatan: 'Ruang Sidang II Kantor Pusat UNS, Kentingan',
      status: 'Pending',
      disposisi: '',
      createdAt: now,
      updatedAt: now,
    },
  ];
  return laykonpers;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const laykonpers = await generateLayananKonpersData();
    await queryInterface.bulkInsert('tb_laykonpers', laykonpers, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tb_laykonpers', null, {});
  },
};
