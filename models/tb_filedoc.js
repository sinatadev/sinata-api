'use strict';
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');
const tb_dokumentasi = require('../models/tb_dokumentasi');

class tb_filedoc extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}
tb_filedoc.init(
  {
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.NUMBER
      },
    id_dokumentasi: {
      type: DataTypes.NUMBER,
      allowNull: false,
      references: {
        model: 'tb_dokumentasi',
        key: 'id',
      },
    },
    nama_file: {
      type: DataTypes.STRING,
    },
    tipe_file: {
      type: DataTypes.STRING,
    },
    size_file: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'tb_filedoc',
    freezeTableName: true,
  },
);

tb_filedoc.belongsTo(tb_dokumentasi, { foreignKey: 'id_dokumentasi' });
tb_dokumentasi.hasMany(tb_filedoc, {
  as: 'tb_filedoc',
  foreignKey: 'id_dokumentasi',
});

module.exports = tb_filedoc;
