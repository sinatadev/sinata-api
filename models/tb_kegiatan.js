'use strict';
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');
const tb_account = require('./tb_account');

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
tb_kegiatan.init(
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
        model: tb_account,
        key: 'id',
      },
    },
    judul_kegiatan: {
      type: DataTypes.STRING,
    },
    des_kegiatan: {
      type: DataTypes.TEXT,
    },
    sifat_kegiatan: {
      type: DataTypes.ENUM('Terbuka', 'Undangan'),
      defaultValue: 'Terbuka',
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
    surat_permohonan: {
      type: DataTypes.STRING,
    },
    sik: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'tb_kegiatan',
    freezeTableName: true,
  },
);

tb_kegiatan.belongsTo(tb_account, { foreignKey: 'id_account' });
tb_account.hasMany(tb_kegiatan, {
  as: 'tb_kegiatan',
  foreignKey: 'id_account',
});

module.exports = tb_kegiatan;
