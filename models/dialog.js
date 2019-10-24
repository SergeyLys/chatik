'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dialog = sequelize.define('Dialog', {
    author: DataTypes.INTEGER,
    partner: DataTypes.INTEGER,
    messages: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {});
  Dialog.associate = function(models) {
    Dialog.belongsTo(models.User, {foreignKey: 'author'})
  };
  return Dialog;
};