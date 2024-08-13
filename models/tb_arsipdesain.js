'use strict';
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');
const tb_account = require('./tb_account');

class tb_arsipdesain extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}
tb_arsipdesain.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.NUMBER
    },
    id_account: {
      type: DataTypes.NUMBER,
      allowNull: false,
      references: {
        model: 'tb_account',
        key: 'id',
      },
    },
    judul_desain: {
      type: DataTypes.STRING,
    },
    kategori: {
      type: DataTypes.STRING,
    },
    keterangan: {
      type: DataTypes.TEXT,
    },
    deadline: {
      type: DataTypes.DATE,
    },
      id_status: {
          type: DataTypes.NUMBER,
          defaultValue: 1,
      },
    lampiran_file: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'tb_arsipdesain',
    freezeTableName: true,
  },
);

tb_arsipdesain.belongsTo(tb_account, { foreignKey: 'id_account' });
tb_account.hasMany(tb_arsipdesain, {
  as: 'tb_arsipdesain',
  foreignKey: 'id_account',
});

module.exports = tb_arsipdesain;
