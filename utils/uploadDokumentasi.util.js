const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/dokumentasi/')
    },
    filename: (req, file, cb) => {
        let originalExt = file.originalname.split('.')[file.originalname.split('.').length - 1]
        cb(null, file.originalname + '+' + Date.now() + '.' + originalExt)
    }
})

const uploadDokumentasi = multer({ storage: storage })

module.exports = uploadDokumentasi