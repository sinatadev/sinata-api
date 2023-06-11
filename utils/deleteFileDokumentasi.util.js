const fs = require('fs')
const path = require('path')

async function deleteFileDokumentasi(filePath) {
    filePath = path.join('uploads/dokumentasi/', filePath)

    fs.unlink(filePath, (error) => {
        if (error) {
            console.log('Gagal menghapus file: ', error)
            throw error
        }
        console.log('File berhasil dihapus: ', filePath)
    })
}

module.exports = deleteFileDokumentasi