//lowercase sequelize is our connection
module.exports = function(sequelize, DataTypes) {
  //Schema
  var user = sequelize.define("user", {
    // Giving the users model a name of type STRING
    name: DataTypes.STRING
  });

  return user;
};
