'use strict';

module.exports = {
  up:(queryInterface) =>queryInterface.bulkInsert(
    'Buses',
    [
      {
        id:1,
        busPlate:'RAC456C',
        busStatus:'moving',
        busLocation:'Muhima',
        busCompany:'KBS',
        busSeats:80,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:2,
        busPlate:'RAD467B',
        busStatus:'stuck',
        busLocation:'SONATUBE',
        busCompany:'KBS',
        busSeats:85,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:3,
        busPlate:'RAC676B',
        busStatus:'rest',
        busLocation:'Kacyiru',
        busCompany:'Loyal',
        busSeats:25,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down:(queryInterface) =>queryInterface.bulkDelete('Buses',null,{}),
};
