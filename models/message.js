'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    text: DataTypes.STRING,
    readed: DataTypes.BOOLEAN,
    author: DataTypes.INTEGER,
    dialog: DataTypes.INTEGER
  }, {});
  Message.associate = function(models) {
    Message.belongsTo(models.Dialog, {foreignKey: 'dialog'})
  };
  return Message;
};