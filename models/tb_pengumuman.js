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
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
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
  status: {
    type: DataTypes.ENUM('Active', 'Inactive'),
    defaultValue: 'Active'
  }
}, {
  sequelize,
  modelName: 'tb_pengumuman',
  freezeTableName: true
});

module.exports = tb_pengumuman