'use strict';
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class tb_account extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}
tb_account.init({
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  username: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  name: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  no_identitas: {
    type: DataTypes.STRING
  },
  unit: {
    type: DataTypes.STRING
  },
  token: {
    type: DataTypes.STRING
  },
  role: {
    type: DataTypes.ENUM('User', 'Super Admin', 'Admin Role 1', 'Admin Role 2', 'Admin Role 3', 'Admin Role 4', 'Admin Role 5', 'Admin Role 6', 'Admin Role 7', 'Admin Role 8', 'Admin Role 9'),
    defaultValue: 'User',
  },
  kontak: {
    type: DataTypes.STRING
  },
  img_profil: {
    type: DataTypes.STRING
  },
}, {
  sequelize,
  modelName: 'tb_account',
  freezeTableName: true
})

module.exports = tb_account