'use strict';
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');
const tb_dokumentasi = require('../models/tb_dokumentasi')

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
tb_filedoc.init({
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  id_file: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'tb_dokumentasi',
      key: 'id'
    }
  },
  nama_file: {
    type: DataTypes.STRING
  },
  tipe_file: {
    type: DataTypes.STRING
  },
  size_file: {
    type: DataTypes.INTEGER
  },
  data_file: {
    type: DataTypes.TEXT
  }
}, {
  sequelize,
  modelName: 'tb_filedoc',
  freezeTableName: true
});

tb_filedoc.belongsTo(tb_dokumentasi, { foreignKey: 'id_file' })
tb_dokumentasi.hasMany(tb_filedoc, { foreignKey: 'id_file' })

module.exports = tb_filedoc