const Balihos = require('../models/tb_laybaliho')
const DataKegiatans = require('../models/tb_kegiatan')
const Accounts = require('../models/tb_account')
const deleteFile = require('../utils/deleteFIle.util')

module.exports = {
    viewBaliho: async (req, res) => {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 5
        const offset = (page - 1) * limit
        try {
            const totalRow = await Balihos.count()
            const totalPage = Math.ceil(totalRow / limit)
            const baliho = await Balihos.findAll({
                include: {
                    model: DataKegiatans,
                    required: true,
                    include : {
                        model: Accounts,
                        required: true
                    }
                },
                limit,
                offset,
                order: [['createdAt', 'DESC']]
            })

            const modifiedBaliho = baliho.map(item => {
                const modifiedItem = { ...item.toJSON() }
                modifiedItem.tb_kegiatan.tb_account.password = undefined
                return modifiedItem
            })

            res.status(200).json({
                message: `Berhasil menampilkan ${baliho.length} Layanan Pemasangan Baliho`,
                page,
                totalPage,
                totalRow,
                rowsPerPage: limit,
                data: modifiedBaliho
            })
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })
        }
    },
    addBaliho: async (req, res) => {
        const payload = req.body
        try {
            const baliho = await Balihos.create(payload)
            if(req.files.bahan_publikasi){
                const { bahan_publikasi } = req.files
                baliho.bahan_publikasi = bahan_publikasi[0].filename
            }
            if(req.files.bukti_pembayaran){
                const { bukti_pembayaran } = req.files
                baliho.bukti_pembayaran = bukti_pembayaran[0].filename
            }
            if(req.files.disposisi){
                const { disposisi } = req.files
                baliho.disposisi = disposisi[0].filename
            }
            if(req.files.luaran_layanan){
                const { luaran_layanan } = req.files
                baliho.luaran_layanan = luaran_layanan[0].filename
            }
            await baliho.save()
            
            res.status(201).json({
                message: `Layanan baliho baru berhasil ditambahkan.`,
                data: baliho
            })
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })
        }
    },
    editBaliho: async (req, res) => {
        const { id } = req.params
        const payload = req.body
        try {
            const baliho = await Balihos.findByPk(id)
            if(baliho) {
                Object.assign(baliho, payload)
                if(req.files.bahan_publikasi){
                    const { bahan_publikasi } = req.files
                    if(baliho.bahan_publikasi){
                        deleteFile(baliho.bahan_publikasi)
                    }
                    baliho.bahan_publikasi = bahan_publikasi[0].filename
                }
                if(req.files.bukti_pembayaran){
                    const { bukti_pembayaran } = req.files
                    if(baliho.bukti_pembayaran){
                        deleteFile(baliho.bukti_pembayaran)
                    }
                    baliho.bukti_pembayaran = bukti_pembayaran[0].filename
                }
                if(req.files.disposisi){
                    const { disposisi } = req.files
                    if(baliho.disposisi){
                        deleteFile(baliho.disposisi)
                    }
                    baliho.disposisi = disposisi[0].filename
                }
                if(req.files.luaran_layanan){
                    const { luaran_layanan } = req.files
                    if(baliho.luaran_layanan){
                        deleteFile(baliho.luaran_layanan)
                    }
                    baliho.luaran_layanan = luaran_layanan[0].filename
                }
                await baliho.save()

                res.status(200).json({
                    message: `Layanan baliho berhasil diubah.`,
                    data: baliho
                })
            } else {
                res.status(404).json({
                    message: 'Data layanan pemasangan baliho tidak ditemukan.'
                })
            }
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })
        }
    },
    deleteBaliho: async (req, res) => {
        const { id } = req.params
        try {
            const baliho = await Balihos.findByPk(id)
            if(baliho) {
                if(baliho.bahan_publikasi){
                    deleteFile(baliho.bahan_publikasi)
                }
                if(baliho.bukti_pembayaran){
                    deleteFile(baliho.bukti_pembayaran)
                }
                if(baliho.disposisi){
                    deleteFile(baliho.disposisi)
                }
                if(baliho.luaran_layanan){
                    deleteFile(baliho.luaran_layanan)
                }
                await baliho.destroy()

                res.status(200).json({
                    message: `Layanan baliho berhasil dihapus.`
                })
            } else {
                res.status(404).json({
                    message: 'Data layanan pemasangan baliho tidak ditemukan.'
                })
            }
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })
        }
    }
}