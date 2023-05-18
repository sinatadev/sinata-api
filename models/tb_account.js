'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
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
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    no_identitas: DataTypes.STRING,
    unit: DataTypes.STRING,
    token: DataTypes.STRING,
    role: DataTypes.STRING,
    kontak: DataTypes.STRING,
    img_profil: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tb_account',
  });
  return tb_account;
};