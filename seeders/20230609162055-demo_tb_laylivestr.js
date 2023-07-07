'use strict';

/** @type {import('sequelize-cli').Migration} */

const now = new Date();

async function generateLayananLiveStreamingData() {
  const liveStreamings = [
    {
      id: '97hb651h-8714-44e0-a2fe-45b233fh7gb5',
      id_kegiatan: '3dd49c97-8714-44e0-a2fe-45b233f623f5',
      thumbnail_kegiatan: 'thumbnail-kegiatan-a.jpg',
      status: 'Completed',
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
