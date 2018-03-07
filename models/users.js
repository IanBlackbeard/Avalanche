//lowercase sequelize is our connection
module.exports = function(sequelize, DataTypes) {
  //Schema
  var Characters = sequelize.define("Characters", {
    // Giving the Characters model a name of type STRING
    name: DataTypes.STRING
  });

  return Characters;
};
