'use strict';

/** @type {import('sequelize-cli').Migration} */

const now = new Date()

async function generatePengumumanData() {
  const pengumuman = [
    {
      id: 1,
      judul_pengumuman: 'Pengumuman Peluncuran Sistem',
      tgl_upload: now,
      content: 'Kami dengan senang hati mengumumkan peluncuran Sistem Informasi Manajamen Pelayanan dan Berita (SINATA) sebagai bagian dari pelayanan UPT Hubungan Masyarakat dan Media UNS. Dengan sistem ini, Anda dapat mengajukan permohonan pelayanan, melacak status pelayanan, dan menerima pemberitahuan terkait layanan kami. Silakan daftarkan akun Anda sekarang untuk mulai mengajukan permohonan pelayanan.',
      is_active: true,
      createdAt: now,
    },
    {
      id: 2,
      judul_pengumuman: 'Jadwal Pelayanan terkait Hari Kemerdekaan RI',
      tgl_upload: now,
      content: 'Dalam rangka merayakan Hari Kemerdekaan Republik Indonesia, kami ingin memberitahukan kepada masyarakat bahwa pusat pelayanan kami akan tutup pada tanggal 17 Agustus. Pelayanan kami akan dilanjutkan seperti biasa pada hari berikutnya. Mohon maaf atas ketidaknyamanan yang ditimbulkan dan selamat memperingati Hari Kemerdekaan!',
      is_active: true,
      createdAt: now,
    },
    {
      id: 3,
      judul_pengumuman: 'Pengumuman Gangguan Sistem',
      tgl_upload: now,
      content: 'Mohon maaf atas ketidaknyamanan yang Anda alami dalam mengakses sistem kami. Saat ini, kami sedang melakukan pemeliharaan rutin untuk meningkatkan kinerja sistem. Pelayanan kami akan segera normal kembali dalam waktu 2 jam. Terima kasih atas pengertian dan kesabaran Anda.',
      is_active: true,
      createdAt: now,
    },
    {
      id: 4,
      judul_pengumuman: 'Pelatihan Penggunaan Sistem Informasi Manajemen Pelayanan dan Berita (SINATA) UPT Humas dan Media UNS untuk Civitas Akademika UNS',
      tgl_upload: now,
      content: 'Kami mengundang seluruh Civitas Akademika Universitas Sebelas Maret untuk mengikuti workshop "Pelatihan Penggunaan Sistem Informasi Manajemen Pelayanan dan Berita (SINATA) UPT Humas dan Media UNS untuk Civitas Akademika UNS" yang akan diadakan pada tanggal 16 Juli pukul 09.00-12.00 di Aula Utama Kantor UPT Hubungan Masyarakat dan Media UNS. Workshop ini akan membahas cara efektif penggunaan SINATA dalam menjadi platform media proses pengajuan pelayanan yang kami berikan. Pendaftarn dapat dilakukan pada bagian pendaftaran kami, atau melalui telepon.',
      is_active: true,
      createdAt: now,
    }
  ]
  return pengumuman
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const pengumuman = await generatePengumumanData()
    await queryInterface.bulkInsert('tb_pengumuman', pengumuman, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tb_pengumuman', null, {})
  }
};
