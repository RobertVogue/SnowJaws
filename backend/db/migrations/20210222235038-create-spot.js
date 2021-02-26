'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      head: {
        type: Sequelize.STRING(60),
        allowNull: false,
        unique: true
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      units: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      urlLink: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      tracker: {
        type: Sequelize.ARRAY(Sequelize.DOUBLE),
        allowNull: false
      },
      firstAddress: {
        type: Sequelize.STRING(80),
        allowNull: true
      },
      secondAddress: {
        type: Sequelize.STRING(80),
        allowNull: true,
        defaultValue: "",
      },
      city: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      state: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      country: {
        type: Sequelize.STRING(30),
        allowNull: true
      },
      zip: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      dailyCost: {
        type: Sequelize.NUMERIC,
        allowNull: true
      },
      type: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      altSite: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Spots');
  }
};
