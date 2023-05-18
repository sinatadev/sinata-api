'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_kegiatan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tb_kegiatan.init({
    id_account: DataTypes.INTEGER,
    judul_kegiatan: DataTypes.STRING,
    des_kegiatan: DataTypes.TEXT,
    sifat_kegiatan: DataTypes.STRING,
    tgl_kegiatan: DataTypes.DATE,
    waktu_kegiatan: DataTypes.TIME,
    tempat_kegiatan: DataTypes.STRING,
    surat_permohonan: DataTypes.STRING,
    sik: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tb_kegiatan',
  });
  return tb_kegiatan;
};