//lowercase sequelize is our connection
module.exports = function(sequelize, DataTypes) {
  //Schema
  var Character = sequelize.define("Character", {
    // Giving the Characters model a name of type STRING
    name: DataTypes.STRING
  });

  return Character;
};
