'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_navigation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tb_navigation.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.NUMBER
    },
    id_parent_menu: DataTypes.NUMBER,
    type: DataTypes.NUMBER,
    name: DataTypes.STRING,
    route: DataTypes.STRING,
    orderBy: DataTypes.NUMBER,
    icon: DataTypes.STRING,
    createdBy: DataTypes.NUMBER,
    updatedBy: DataTypes.NUMBER,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'tb_navigation',
  });
  return tb_navigation;
};