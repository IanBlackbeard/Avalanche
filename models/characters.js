module.exports = function(sequelize, DataTypes) {
  var characters = sequelize.define("characters", {
    // Giving the characters model a name of type STRING
    name: DataTypes.STRING
  });

  return characters;
};