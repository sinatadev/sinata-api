'use strict';
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');
const tb_account = require('./tb_account');

class tb_laypeminformasi extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}
tb_laypeminformasi.init(
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
    judul_permohonan: {
      type: DataTypes.STRING,
    },
    surat_permohonan: {
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
    luaran_layanan: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'tb_laypeminformasi',
    freezeTableName: true,
  },
);

tb_laypeminformasi.belongsTo(tb_account, { foreignKey: 'id_account' });
tb_account.hasMany(tb_laypeminformasi, {
  as: 'tb_laypeminformasi',
  foreignKey: 'id_account',
});

module.exports = tb_laypeminformasi;
