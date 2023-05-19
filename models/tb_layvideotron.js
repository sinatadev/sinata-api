'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_layvideotron extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tb_layvideotron.init({
    id_kegiatan: DataTypes.INTEGER,
    bahan_publikasi: DataTypes.STRING,
    tgl_awal: DataTypes.DATE,
    tgl_akhir: DataTypes.DATE,
    status: DataTypes.STRING,
    disposisi: DataTypes.STRING,
    luaran_layanan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tb_layvideotron',
  });
  return tb_layvideotron;
};