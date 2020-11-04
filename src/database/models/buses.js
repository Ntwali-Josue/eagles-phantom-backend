
export default (sequelize, DataTypes) => {
  const Buses=sequelize.define('Buses',{
    busPlate: DataTypes.STRING,
    busStatus: DataTypes.STRING,
    busLocation: DataTypes.STRING,
    busCompany: DataTypes.STRING,
    busSeats: DataTypes.INTEGER
  }, {});
  Buses.associate = (models) => {
  };
  return Buses;
};