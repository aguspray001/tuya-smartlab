'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Device extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Device.hasMany(models.HistoryDevice, {
        foreignKey: 'device_id',
        as: 'device'
      })

      Device.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'device_user'
      })
    }
  }
  Device.init({
    device_id: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    category_id: DataTypes.STRING,
    user_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Device',
  });
  return Device;
};