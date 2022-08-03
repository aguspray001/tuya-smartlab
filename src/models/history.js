'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  History.init({
    last_date: DataTypes.DATE,
    user_id: DataTypes.INTEGER,
    device_id: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    message: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};