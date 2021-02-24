'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Users", key: 'id' }
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Spots", key: 'id' }
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    tenRating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cost: {
      type: DataTypes.NUMERIC,
      allowNull: true
    },
  }, {});
  Booking.associate = function (models) {
    // associations can be defined here
    Booking.belongsTo(models.User, { foreignKey: 'userId' });
    Booking.belongsTo(models.Spot, { foreignKey: 'spotId' });
  };
  return Booking;
};
