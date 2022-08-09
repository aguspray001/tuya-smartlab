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

      // many to many user with device
      Device.belongsToMany(models.User, {
        through: 'UserDevice',
        as: 'users',
        foreignKey: 'device_id'
      })

      Device.hasMany(models.History, {
        as: 'histories',
        foreignKey: 'device_id'
      })
    }
  }
  Device.init({
    device_code: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Device',
  });
  return Device;
};