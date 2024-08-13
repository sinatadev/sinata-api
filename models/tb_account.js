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
tb_account.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.NUMBER
    },
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    no_identitas: {
      type: DataTypes.STRING,
    },
    unit: {
      type: DataTypes.STRING,
    },
    id_role: {
      type: DataTypes.NUMBER,
      defaultValue: 1,
    },
    kontak: {
      type: DataTypes.STRING,
    },
    img_profil: {
      type: DataTypes.STRING,
      defaultValue: 'default.jpeg',
    },
  },
  {
    sequelize,
    modelName: 'tb_account',
    freezeTableName: true,
  },
);

module.exports = tb_account;
