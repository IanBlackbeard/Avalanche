var obstacles = [];

var Obstacle = function(name, damage, delay, imgSrc) {
	this.name = name;
	this.damage = damage;
	this.delay = delay;
	this.imgSrc = [];
	this.soundSrc;
}

// Damage numbers are placeholders for now
var bear = new Obstacle("Bear", 75, 5, ["../img/pennyBearDay.gif", "../img/pennyBearNight.gif", "../img/dannyBearDay.gif", "../img/dannyBearNight.gif"]);
var river = new Obstacle("River", 30, 3);
var lake = new Obstacle("Lake", 25, 2);
var chasm = new Obstacle("Chasm", 40, 3);
var brokenLeg = new Obstacle("Broken leg", 50, 4);
var yeti = new Obstacle("Yeti", 50, 4);

module.exports = Obstacle;