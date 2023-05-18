'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_laypeliputan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tb_laypeliputan.init({
    id_kegiatan: DataTypes.INTEGER,
    judul_berita: DataTypes.TEXT,
    kategori: DataTypes.STRING,
    leaflet_kegiatan: DataTypes.STRING,
    status: DataTypes.STRING,
    disposisi: DataTypes.STRING,
    jurnalis: DataTypes.STRING,
    prarilis: DataTypes.TEXT,
    rilis: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'tb_laypeliputan',
  });
  return tb_laypeliputan;
};