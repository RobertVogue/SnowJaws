'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'Demo',
        email: 'demo@user.io',
        admin: true,
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        username: 'FakeUser1',
        email: faker.internet.email(),
        admin: false,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        username: 'FakeUser2',
        email: faker.internet.email(),
        admin: false,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
