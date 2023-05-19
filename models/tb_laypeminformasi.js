'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_laypeminformasi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tb_laypeminformasi.init({
    id_account: DataTypes.INTEGER,
    judul_permohonan: DataTypes.STRING,
    surat_permohonan: DataTypes.STRING,
    bahan_publikasi: DataTypes.STRING,
    status: DataTypes.STRING,
    disposisi: DataTypes.STRING,
    luaran_layanan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tb_laypeminformasi',
  });
  return tb_laypeminformasi;
};