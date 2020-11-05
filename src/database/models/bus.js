'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bus.belongsTo(models.Users, {
        foreignKey: 'userId',
        as: 'driver',
        onDelete: 'CASCADE',
      })
    }
  };
  Bus.init({
    busPlate: DataTypes.STRING,
    busStatus: DataTypes.STRING,
    busLocation: DataTypes.STRING,
    busCompany: DataTypes.STRING,
    busSeats: DataTypes.STRING,
    userId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Bus',
  });
  return Bus;
};