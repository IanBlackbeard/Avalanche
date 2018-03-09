var db = require("../models");

module.exports = function(app) {

// USER INFORMATION -----------------
    // POST INTO NEW USER TO DB
    app.post("/api/users", function(req, res) {
        db.Users.create(req.body).then(function(dbUsers) {
            res.json(dbUsers);
        });
    });

    // GET ALL USER INFO FROM DB
    app.get("/api/users", function(req, res) {
        db.Users.findAll({
        }).then(function(dbusers) {
            res.json(dbUsers);
        });
    });

// CHARACTER INFORMATION ------------
    // GET CHARACTER ID FROM DB
    app.get("/api/characters/:id", function(req, res) {
        db.Characters.findOne({
            where: {
                id: req.params.id
            },
        }).then(function(dbusers) {
            res.json(dbCharacters);
        });
    });

// GEAR INFORMATION -----------------
    // GET GEAR BY ID FROM DB
    app.get("/api/gear/:id", function(req, res) {
        db.Gear.findOne({
            where: {
                id: req.params.id
            },
        }).then(function(dbgear) {
            res.json(dbGear);
        });
    });

//NEWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
// GEAR INFORMATION -----------------
    // GET GEAR BY ID FROM DB
    app.get("/api/gear/", function(req, res) {
        db.Gear.findAll({}).then(function(dbgear) {
            res.json(dbGear);
        });
    });

// OBSTACLES INFORMATION ------------
    // GET OBSTACLES FROM DB
    app.get("/api/obstacles/:id", function(req, res) {
        db.Obstacles.findOne({
            where: {
                id: req.params.id
            },
        }).then(function(dbobstacles) {
            res.json(dbobstacles);
        });
    });

// SCORE INFORMATION ----------------
	// POST THE USERS SCORE TO DB
    app.post("/api/userscore", function(req, res) {
        db.userScore.create(req.body).then(function(dbuserScore) {
        	include: [db.users]
            res.json(dbuserScore);
        });
    });

    // GET USERS HIGH SCORE FROM DB
    app.get("/api/userscore/:id", function(req, res) {
    db.userScore.findOne({
      where: {
        id: req.params.id
      },
      include: [db.users]
    }).then(function(dbuserScore) {
      res.json(dbuserScore);
    });
  });

};