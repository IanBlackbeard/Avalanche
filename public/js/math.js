var db = require("../models");


var obstacles = [
	{
		name: "bear",
		damage: 4
	},
	{
		name: "river",
		damage: 2
	},
	{
		name: "lake",
		damage: 3
	},
	{
		name: "broken bone",
		damage: 1
	}
];

var obstacleOdds = 20;

var Math = {
	 math: function() {
		var obstacleChance = Math.floor(Math.random() * 100);
		if (obstacleChance <= obstacleOdds) {
			var obstacleNumber = Math.floor(Math.random() * 100);
			if (obstacleNumber < 35) {
				res.send(obstacles[0])
				// if ()
			} else if (obstacleNumber < 65) {
				res.send(obstacles[1])
			} else if (obstacleNumber < 85) {
				res.send(obstacles[2])
			} else {
				res.send(obstacles[3])
			}
			obstacleOdds === 20;

		} else {
			res.send("nothing to see here")
			obstacleOdds += 30;
		}

	}
}

module.exports = math;