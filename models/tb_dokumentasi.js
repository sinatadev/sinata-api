'use strict';
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');
const tb_kegiatan = require('./tb_kegiatan');

class tb_dokumentasi extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}
tb_dokumentasi.init(
  {
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.NUMBER
      },
    id_kegiatan: {
      type: DataTypes.NUMBER,
      allowNull: false,
      references: {
        model: 'tb_kegiatan',
        key: 'id',
      },
    },
    keterangan: {
      type: DataTypes.TEXT,
    },
    fotografer: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'tb_dokumentasi',
    freezeTableName: true,
  },
);

tb_dokumentasi.belongsTo(tb_kegiatan, { foreignKey: 'id_kegiatan' });
tb_kegiatan.hasMany(tb_dokumentasi, {
  as: 'tb_dokumentasi',
  foreignKey: 'id_kegiatan',
});

module.exports = tb_dokumentasi;
