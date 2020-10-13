
module.exports = (sequelize, DataTypes) => {
  const Routes=sequelize.define('Routes',{
    price: DataTypes.INTEGER,
    origin: DataTypes.STRING,
    destination: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Routes',
  });
  return Routes;
};