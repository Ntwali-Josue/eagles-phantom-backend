import dotenv from 'dotenv';

dotenv.config();
export default (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    dateofbirth: DataTypes.STRING,
    gender: DataTypes.STRING,
    address: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {});
  Users.associate = (models) => {
    Users.hasOne(models.Bus, {
      foreignKey: 'userId',
      as: 'driver',
      onDelete: 'CASCADE',
    });
  };
  return Users;
};
