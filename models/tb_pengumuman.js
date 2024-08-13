'use strict';
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection')

class tb_pengumuman extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}
tb_pengumuman.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.NUMBER
  },
  judul_pengumuman: {
    type: DataTypes.STRING
  },
  tgl_upload: {
    type: DataTypes.DATE
  },
  content: {
    type: DataTypes.TEXT
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  sequelize,
  modelName: 'tb_pengumuman',
  freezeTableName: true
});

module.exports = tb_pengumuman