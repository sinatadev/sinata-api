const fs = require('fs')
const path = require('path')

function deleteFile(filePath) {
    filePath = path.join('uploads/', filePath)

    fs.unlink(filePath, (error) => {
        if (error) {
            console.log('Gagal menghapus file: ', error)
            throw error
        }
        console.log('File berhasil dihapus: ', filePath)
    })
}

module.exports = deleteFile