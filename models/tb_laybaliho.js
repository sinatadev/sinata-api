'use strict';
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');
const tb_kegiatan = require('./tb_kegiatan');

class tb_laybaliho extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}
tb_laybaliho.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    id_kegiatan: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'tb_kegiatan',
        key: 'id',
      },
    },
    bahan_publikasi: {
      type: DataTypes.STRING,
    },
    tgl_awal: {
      type: DataTypes.DATE,
    },
    tgl_akhir: {
      type: DataTypes.DATE,
    },
    bukti_pembayaran: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM(
        'Pending',
        'Approved & On Progress',
        'Rejected',
        'Complete',
      ),
      defaultValue: 'Pending',
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
    modelName: 'tb_laybaliho',
    freezeTableName: true,
  },
);

tb_laybaliho.belongsTo(tb_kegiatan, { foreignKey: 'id_kegiatan' });
tb_kegiatan.hasMany(tb_laybaliho, { as: 'tb_laybaliho', foreignKey: 'id' });

module.exports = tb_laybaliho;
