'use strict';
module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users', key: 'id'}
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Spots', key: 'id'}
    },
    fiveRating: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {});
  Admin.associate = function(models) {
    // associations can be defined here
  };
  return Admin;
};
