'use strict';
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

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
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  id_account: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'tb_account',
      key: 'id'
    }
  },
  judul_kegiatan: {
    type: DataTypes.STRING
  },
  des_kegiatan: {
    type: DataTypes.TEXT
  },
  sifat_kegiatan: {
    type: DataTypes.STRING
  },
  tgl_kegiatan: {
    type: DataTypes.DATE
  },
  waktu_kegiatan: {
    type: DataTypes.TIME
  },
  tempat_kegiatan: {
    type: DataTypes.STRING
  },
  surat_permohonan: {
    type: DataTypes.STRING
  },
  sik: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'tb_kegiatan',
  freezeTableName: true
})

module.exports = tb_kegiatan