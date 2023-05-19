'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_arsip_pers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tb_arsip_pers.init({
    id_peliputan: DataTypes.INTEGER,
    no_rilis: DataTypes.STRING,
    tgl_upload: DataTypes.DATE,
    waktu_upload: DataTypes.TIME,
    admin: DataTypes.STRING,
    link_berita: DataTypes.STRING,
    penerjemah: DataTypes.STRING,
    judul_terjemahan: DataTypes.STRING,
    tgl_upload_terj: DataTypes.DATE,
    waktu_upload_terj: DataTypes.TIME,
    admin_terj: DataTypes.STRING,
    link_terj: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tb_arsip_pers',
  });
  return tb_arsip_pers;
};