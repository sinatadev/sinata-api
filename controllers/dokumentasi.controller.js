// const Dokumentasis = require('../models/tb_dokumentasi')
// const Filedocs = require('../models/tb_filedoc')
// const DataKegiatans = require('../models/tb_kegiatan')
// const Accounts = require('../models/tb_account')
const deleteFileDokumentasi = require('../utils/deleteFileDokumentasi.util')

module.exports = {
    viewDokumentasi: async (req, res) => {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 5
        const offset = (page - 1) * limit
        try {
            const totalRow = await Dokumentasis.count()
            const totalPage = Math.ceil(totalRow / limit)
            const dokumentasi = await Dokumentasis.findAll({
                include: {
                    model: DataKegiatans,
                    required: true,
                    include: {
                        model: Accounts,
                        required: true
                    },
                },
                limit,
                offset,
                order: [['createdAt', 'DESC']]
            })

            const modifiedDokumentasi = dokumentasi.map(item => {
                const modifiedItem = { ...item.toJSON() }
                modifiedItem.tb_kegiatan.tb_account.password = undefined
                return modifiedItem
            })

            res.status(200).json({
                message: `Berhasil menampilkan ${dokumentasi.length} Dokumentasi Kegiatan`,
                page,
                totalPage,
                totalRow,
                rowsPerPage: limit,
                data: modifiedDokumentasi
            })
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })
        }
    },
    addDokumentasi: async (req, res) => {
        const payload = req.body
        try {
            const dokumentasi = await Dokumentasis.create(payload)
            if(req.files) {
                const files = req.files
                const fileData = files.map(item => {
                    return {
                        nama_file: item.filename,
                        size_file: item.size,
                        tipe_file: item.mimetype,
                        id_dokumentasi: dokumentasi.id
                    }
                })
                await Filedocs.bulkCreate(fileData)
            }
            await dokumentasi.save()

            res.status(201).json({
                message: 'Data dokumentasi berhasil ditambahkan.',
                data: dokumentasi
            })
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })
        }
    },
    editDokumentasi: async (req, res) => {
        const { id } = req.params
        const payload = req.body
        try {
            const dokumentasi = await Dokumentasis.findByPk(id)
            if(dokumentasi){
                Object.assign(dokumentasi, payload)

                await dokumentasi.save(
                    res.status(200).json({
                        message: `Data arsip dokumentasi berhasil diubah.`,
                        data: dokumentasi
                    })    
                )
            } else {
                res.status(404).json({
                    message: 'Data arsip dokumentasi tidak ditemukan.'
                })
            }
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })
        }
    },
    deleteDokumentasi: async(req, res) => {
        const { id } = req.params
        try {
            const dokumentasi = await Dokumentasis.findByPk(id)
            if(dokumentasi){
                const filedocs = await Filedocs.findAll({
                    where: { id_dokumentasi: id }
                })
                filedocs.map(item => {
                    return deleteFileDokumentasi(item.nama_file)
                })
                await dokumentasi.destroy()

                res.status(200).json({
                    message: `Layanan publikasi di majalah berhasil dihapus.`,
                })
            } else {
                res.status(404).json({
                    message: 'Data arsip dokumentasi tidak ditemukan.'
                })
            }
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })
        }
    }
}