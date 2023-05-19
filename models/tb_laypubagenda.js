'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_laypubagenda extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tb_laypubagenda.init({
    id_kegiatan: DataTypes.INTEGER,
    leaflet_kegiatan: DataTypes.STRING,
    caption: DataTypes.TEXT,
    status: DataTypes.STRING,
    disposisi: DataTypes.STRING,
    luaran_layanan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tb_laypubagenda',
  });
  return tb_laypubagenda;
};