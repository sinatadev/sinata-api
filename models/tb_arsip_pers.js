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
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    id_peliputan: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'tb_laypeliputan',
        key: 'id'
      }
    },
    no_rilis: {
      type: DataTypes.STRING
    },
    tgl_upload: {
      type: DataTypes.DATE
    },
    waktu_upload: {
      type: DataTypes.TIME
    },
    admin: {
      type: DataTypes.STRING
    },
    link_berita: {
      type: DataTypes.STRING
    },
    penerjemah: {
      type: DataTypes.STRING
    },
    judul_terjemahan: {
      type: DataTypes.STRING
    },
    tgl_upload_terj: {
      type: DataTypes.DATE
    },
    waktu_upload_terj: {
      type: DataTypes.TIME
    },
    admin_terj: {
      type: DataTypes.STRING
    },
    link_terj: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'tb_arsip_pers',
  });
  return tb_arsip_pers;
};