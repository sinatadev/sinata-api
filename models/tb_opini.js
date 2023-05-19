'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_opini extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tb_opini.init({
    id_account: DataTypes.INTEGER,
    judul_pembahasan: DataTypes.STRING,
    surat_permohonan: DataTypes.STRING,
    foto_penulis: DataTypes.STRING,
    bahan_publikasi: DataTypes.STRING,
    status: DataTypes.STRING,
    disposisi: DataTypes.STRING,
    tgl_waktu_upload: DataTypes.DATE,
    admin: DataTypes.STRING,
    link_berita: DataTypes.STRING,
    penerjemah: DataTypes.STRING,
    tgl_waktu_upload_terj: DataTypes.DATE,
    admin_terj: DataTypes.STRING,
    link_terj: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tb_opini',
  });
  return tb_opini;
};