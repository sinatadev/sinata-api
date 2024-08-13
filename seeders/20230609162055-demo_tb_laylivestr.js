'use strict';

/** @type {import('sequelize-cli').Migration} */

const now = new Date();

async function generateLayananLiveStreamingData() {
  const liveStreamings = [
    {
      id: 1,
      id_kegiatan: 1,
      thumbnail_kegiatan: 'thumbnail-kegiatan-a.jpg',
      id_status: 4,
      disposisi: 'disposisi-a.pdf',
      luaran_layanan:
        'Luaran berupa url youtube video, stream url, dan stream key.',
      createdAt: now,
      updatedAt: now,
    },
  ];
  return liveStreamings;
}
module.exports = {
  async up(queryInterface, Sequelize) {
    const liveStreamings = await generateLayananLiveStreamingData();
    await queryInterface.bulkInsert('tb_laylivestr', liveStreamings, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tb_laylivestr', null, {});
  },
};
