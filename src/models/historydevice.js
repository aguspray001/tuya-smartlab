'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HistoryDevice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      HistoryDevice.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      })

      HistoryDevice.belongsTo(models.Device, {
        foreignKey: 'device_id',
        as: 'device'
      })
    }
  }
  HistoryDevice.init({
    last_date: DataTypes.DATE,
    user_id: DataTypes.INTEGER,
    device_id: DataTypes.STRING,
    last_status: DataTypes.BOOLEAN,
    message: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'HistoryDevice',
  });
  return HistoryDevice;
};