'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_laylivestr extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tb_laylivestr.init({
    id_kegiatan: DataTypes.INTEGER,
    thumbnail_kegiatan: DataTypes.STRING,
    status: DataTypes.STRING,
    disposisi: DataTypes.STRING,
    luaran_layanan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tb_laylivestr',
  });
  return tb_laylivestr;
};