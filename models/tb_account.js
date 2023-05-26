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
      type: DataTypes.STRING
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
  });
  return tb_account;
};