// const Dokumentasis = require('../models/tb_dokumentasi')
// const Filedocs = require('../models/tb_filedoc')
const deleteFileDokumentasi = require('../utils/deleteFileDokumentasi.util')

module.exports = {
    viewFileDoc: async (req, res) => {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 5
        const offset = (page - 1) * limit
        const { id } = req.params
        try {
            const totalRow = await Filedocs.count()
            const totalPage = Math.ceil(totalRow / limit)
            const filedoc = await Filedocs.findAll({
                include: {
                    model: Dokumentasis,
                    required: true
                },
                where: { id_dokumentasi: id},
                limit,
                offset,
                order: [['createdAt', 'DESC']]
            })

            res.status(200).json({
                message: `Berhasil menampilkan ${filedoc.length} file dokumentasi kegiatan`,
                page,
                totalPage,
                totalRow,
                rowsPerPage: limit,
                data: filedoc
            })
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })
        }
    },
    deleteFileDoc: async (req, res) => {
        const { id } = req.params
        try {
            const filedoc = await Filedocs.findByPk(id)
            if(filedoc) {
                if(filedoc.nama_file) {
                    deleteFileDokumentasi(filedoc.nama_file)
                }
                await filedoc.destroy()
                
                res.status(200).json({
                    message: `File dokumentasi berhasil dihapus.`,
                })
            } else {
                res.status(404).json({
                    message: 'Data file dokumentasi tidak ditemukan.'
                })
            }
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })
        }
    }
}