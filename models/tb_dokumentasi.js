'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_dokumentasi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tb_dokumentasi.init({
    id_kegiatan: DataTypes.INTEGER,
    keterangan: DataTypes.TEXT,
    fotografer: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tb_dokumentasi',
  });
  return tb_dokumentasi;
};