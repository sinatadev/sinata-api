const fs = require('fs');
const path = require('path');

async function deleteFileDokumentasi(filePath) {
  filePath = path.join('uploads/dokumentasi/', filePath);

  try {
    fs.unlink(filePath, (error) => {
      if (error) {
        console.log('Gagal menghapus file: ', error);
      }
      console.log('File berhasil dihapus: ', filePath);
    });
  } catch (error) {
    console.log('Terjadi kesalahan saat menghapus file: ', error);
  }
}

module.exports = deleteFileDokumentasi;
