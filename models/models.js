// USERS MODEL
module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("users", {
    // Giving the characters model a name of type STRING
    name: DataTypes.STRING
  });

  return Users;
};

// CHARACTERS MODEL
module.exports = function(sequelize, DataTypes) {
  var Characters = sequelize.define("characters", {
    // Giving the characters model a name of type STRING
    name: DataTypes.STRING
  });

  return Characters;
};

// GEAR MODEL 
module.exports = function(sequelize, DataTypes) {
  var Gear = sequelize.define("gear", {
    // Giving the characters model a name of type STRING
    name: DataTypes.STRING
  });

  return Gear;
};

// OBSTACLES MODEL
module.exports = function(sequelize, DataTypes) {
  var Obstacles = sequelize.define("obstacles", {
    // Giving the characters model a name of type STRING
    name: DataTypes.STRING
    delay: DataTypes. INTEGER
    damage: DataTypes. INTEGER
  });

  return Obstacles;
};

// SCORE MODEL
module.exports = function(sequelize, DataTypes) {
  var userScore = sequelize.define("userScore", {
    // Giving the characters model a name of type STRING
    name: DataTypes.STRING
    delay: //// integer
    damage: //// integer
  });

  return userScore;
};