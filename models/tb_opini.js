'use strict';
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');
const tb_account = require('./tb_account');

class tb_opini extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}
tb_opini.init(
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
    judul_pembahasan: {
      type: DataTypes.STRING,
    },
    surat_permohonan: {
      type: DataTypes.STRING,
    },
    foto_penulis: {
      type: DataTypes.STRING,
    },
    bahan_publikasi: {
      type: DataTypes.STRING,
    },
      id_status: {
          type: DataTypes.NUMBER,
          defaultValue: 1,
      },
    disposisi: {
      type: DataTypes.STRING,
    },
    tgl_waktu_upload: {
      type: DataTypes.DATE,
    },
    admin: {
      type: DataTypes.STRING,
    },
    link_berita: {
      type: DataTypes.STRING,
    },
    penerjemah: {
      type: DataTypes.STRING,
    },
    tgl_waktu_upload_terj: {
      type: DataTypes.DATE,
    },
    admin_terj: {
      type: DataTypes.STRING,
    },
    link_terj: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'tb_opini',
    freezeTableName: true,
  },
);

tb_opini.belongsTo(tb_account, { foreignKey: 'id_account' });
tb_account.hasMany(tb_opini, { as: 'tb_opini', foreignKey: 'id_account' });

module.exports = tb_opini;
