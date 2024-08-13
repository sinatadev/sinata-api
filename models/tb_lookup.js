'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_lookup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tb_lookup.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.NUMBER
    },
    type: DataTypes.STRING,
    name: DataTypes.STRING,
    value: DataTypes.NUMBER,
    description: DataTypes.STRING,
    createdBy: DataTypes.NUMBER,
    updatedBy: DataTypes.NUMBER,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'tb_lookup',
  });
  return tb_lookup;
};