'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_laybaliho extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tb_laybaliho.init({
    id_kegiatan: DataTypes.INTEGER,
    bahan_publikasi: DataTypes.STRING,
    tgl_awal: DataTypes.DATE,
    tgl_akhir: DataTypes.DATE,
    bukti_pembayaran: DataTypes.STRING,
    status: DataTypes.STRING,
    disposisi: DataTypes.STRING,
    luaran_layanan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tb_laybaliho',
  });
  return tb_laybaliho;
};