module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Buses',
    [
      {
        busPlate: "RAB345E",
        busCompany: "Royal",
        busSeats: 29,
        busStatus: 'inactive',
        busLocation: 'Zindiro',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
 
      {
        busPlate: "RAB345F",
        busCompany: "KBS",
        busSeats: 99,
        busStatus: 'active',
        busLocation: 'Zindiro',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Buses', null, {}),
};
