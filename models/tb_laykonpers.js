'use strict';
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');
const tb_account = require('./tb_account');

class tb_laykonpers extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}
tb_laykonpers.init(
  {
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.NUMBER
      },
    id_account: {
      type: DataTypes.NUMBER,
      allowNull: false,
      references: {
        model: 'tb_account',
        key: 'id',
      },
    },
    judul_kegiatan: {
      type: DataTypes.STRING,
    },
    surat_permohonan: {
      type: DataTypes.STRING,
    },
    leaflet_kegiatan: {
      type: DataTypes.STRING,
    },
    tgl_kegiatan: {
      type: DataTypes.DATE,
    },
    waktu_kegiatan: {
      type: DataTypes.TIME,
    },
    tempat_kegiatan: {
      type: DataTypes.STRING,
    },
    id_status: {
      type: DataTypes.NUMBER,
      defaultValue: 1,
    },
    disposisi: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'tb_laykonpers',
    freezeTableName: true,
  },
);

tb_laykonpers.belongsTo(tb_account, { foreignKey: 'id_account' });
tb_account.hasMany(tb_laykonpers, {
  as: 'tb_laykonpers',
  foreignKey: 'id_account',
});

module.exports = tb_laykonpers;
