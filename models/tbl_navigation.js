'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_navigation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_navigation.init({
    parentMenuId: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
    name: DataTypes.STRING,
    route: DataTypes.STRING,
    orderBy: DataTypes.INTEGER,
    icon: DataTypes.STRING,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'tbl_navigation',
  });
  return tbl_navigation;
};