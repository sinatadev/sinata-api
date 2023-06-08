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
tb_arsipdesain.init({
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  id_account: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'tb_account',
      key: 'id'
    }
  },
  judul_desain: {
    type: DataTypes.STRING
  },
  kategori: {
    type: DataTypes.STRING
  },
  keterangan: {
    type: DataTypes.TEXT
  },
  deadline: {
    type: DataTypes.DATE
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Approved & On Progress', 'Rejected', 'Complete'),
    defaultValue: 'Pending',  
  },
  lampiran_file: {
    type: DataTypes.STRING
  },
}, {
  sequelize,
  modelName: 'tb_arsipdesain',
  freezeTableName: true
})

tb_arsipdesain.belongsTo(tb_account, { foreignKey: 'id_account' })
tb_account.hasMany(tb_arsipdesain, { foreignKey: 'id_account' })

module.exports = tb_arsipdesain