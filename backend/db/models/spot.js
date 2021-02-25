'use strict';
module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define('Spot', {
    head: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: true
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    units: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    urlLink: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tracker: {
      type: DataTypes.ARRAY(DataTypes.DOUBLE),
      allowNull: false
    },
    firstAddress: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    secondAddress: {
      type: DataTypes.STRING(80),
      allowNull: true,
      defaultValue: "",
    },
    city: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    country: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    zip: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    dailyCost: {
      type: DataTypes.NUMERIC,
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    altSite: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {});
  Spot.associate = function (models) {
    // associations can be defined here
    Spot.hasMany(models.Booking, { foreignKey: 'spotId' });
    Spot.hasMany(models.Review, { foreignKey: 'spotId' });
    Spot.belongsToMany(models.User, { through: 'Admin', otherKey: 'userId', foreignKey: 'spotId' });
  };
  return Spot;
};
