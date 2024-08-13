'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_navigation_assignment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tb_navigation_assignment.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.NUMBER
    },
    id_navigation: DataTypes.NUMBER,
    id_role: DataTypes.NUMBER,
    createdBy: DataTypes.NUMBER,
    updatedBy: DataTypes.NUMBER,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'tb_navigation_assignment',
  });
  return tb_navigation_assignment;
};