'use strict';
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');
const tb_kegiatan = require('./tb_kegiatan');

class tb_laylivestr extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}
tb_laylivestr.init(
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
    thumbnail_kegiatan: {
      type: DataTypes.STRING,
    },
    status: {
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
    modelName: 'tb_laylivestr',
    freezeTableName: true,
  },
);

tb_laylivestr.belongsTo(tb_kegiatan, { foreignKey: 'id_kegiatan' });
tb_kegiatan.hasMany(tb_laylivestr, {
  as: 'tb_laylivestr',
  foreignKey: 'id_kegiatan',
});

module.exports = tb_laylivestr;
