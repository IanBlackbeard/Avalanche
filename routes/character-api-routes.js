var db = require("../models");

module.exports = function(app) {

// USER INFORMATION -----------------
    // POST INTO NEW USER TO DB
    app.post("/api/users", function(req, res) {
        db.users.create(req.body).then(function(dbusers) {
            res.json(dbusers);
        });
    });

    // GET ALL USER INFO FROM DB
    app.get("/api/users", function(req, res) {
        db.users.findAll({
        }).then(function(dbusers1234=) {
            res.json(dbusers);
        });
    });

// CHARACTER INFORMATION ------------
    // GET CHARACTER ID FROM DB
    app.get("/api/characters/:id", function(req, res) {
        db.characters.findOne({
            where: {
                id: req.params.id
            },
        }).then(function(dbusers) {
            res.json(dbusers);
        });
    });

// GEAR INFORMATION -----------------
    // GET GEAR BY ID FROM DB
    app.get("/api/gear/:id", function(req, res) {
        db.gear.findOne({
            where: {
                id: req.params.id
            },
        }).then(function(dbgear) {
            res.json(dbgear);
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