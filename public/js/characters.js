var Obstacle = require("./obsticles.js");

var time = ["6:00"]

var backpack = [];

var allItems = [
	"food",
	"flare gun",
	"axe",
	"emergency blanket",
	"clothes",
	"water",
	"flint",
	"shovel",
	"knife",
	"hand warmers"
];


// Character Constructor
var Character = function(name, backpack, lifePoints) {
	this.name = name;
	this.backpack = []; // will this work?
	this.lifePoints = lifePoints;
	this.isAlive = function() {
	if (this.hitPoints > 0) {
		console.log(this.name + " is still alive!");
		console.log("\n---------------\n");
		return true;
	}
	console.log(this.name + " has died!");
		return false;
	}
	this.PrintStats = function() {
		console.log(this);	
	}
	this.itemSelect = function(i1, i2, i3, i4) {
		this.backpack.push(selectedItems);
	};
}

// Constructor to use global variables to pass through obstacle and character
Character.prototype.reachObstacle = function(obstacle) {
	Character.lifePoints -= Obstacle.damage;
}

var dannyDanger = new Character("Danny Danger", PUT ARRAY HERE, 100);
var pennyPeril = new Character("Penny Peril", PUT ARRAY HERE, 100);

while (dannyDanger.isAlive() === true) {
	dannyDanger.PrintStats();
	dannyDanger.
}	

// User Constructor
var Player = function(initials) {
	this.initials;
	this.score;
}

module.exports = Character;
module.exports = Player;