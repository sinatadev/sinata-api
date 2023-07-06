const fs = require('fs');
const path = require('path');

function deleteFile(filePath) {
  filePath = path.join('uploads/', filePath);

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

module.exports = deleteFile;
