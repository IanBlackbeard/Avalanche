$(document).ready(function() {

var time = "7:00 AM";
var timeArray = ["7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM", "12:00 AM", "1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM", "5:00 AM", "6:00 AM"];
var timeCount = 0;
var lifePoints = 100;
var lpph = 4;
var speed = 1;
var distanceTraveled = 0;
var imageCount = 0;

var characters = [
	{
		name: "Danny Danger",
		image: "./img/danny.jpg",
		avatar: "./img/DannyDangerSmall.png",
		mainMovement: ["./img/dannyLeft.jpg", "./img/dannyMid.jpg", "./img/dannyRight.jpg"],
		nightMovement: ["./img/dannyNightLeft.jpg", "./img/dannyNightMid.jpg", "./img/dannyNightRight.jpg"]
	},
	{
		name: "Penny Peril",
		image: "./img/penny.jpg",
		avatar: "./img/PennyPerilSmall.png",
		mainMovement: ["./img/pennyLeft.jpg", "./img/pennyMid.jpg", "./img/pennyRight.jpg"],
		nightMovement: ["./img/pennyNightLeft.jpg", "./img/pennyNightMid.jpg", "./img/pennyNightRight.jpg"]
	}
];
var character;

var allItems = [
	"Axe", //--------------- Bear
	"Flint", //------------- River
	"First-Aid-Kit", //----- Broken Bone
	"Climbing gear", //----- Cravasse
	"Hand-Warmers", //------ Frost Bite
	"Water", //------------- Altitude sickness
	"Emergency-Blanket", //- Blizzard 
	"Food", //--------------- Wolf
	"Flashlight", //--------- darkness
	"Riddle" //------------- Yeti
];
var backpack = [];

var nameInput = $("#user-name");
var newUser;

$(".start-page").show();
$("#start-screen-img").on("click", function() {
	$(".start-page").hide();
	$(".black-screen").show();
    $(".story").show();
});

$(".story").on("click", function() {
	$(".story").hide();
	$("#group").show();
	var groupImage = $("<img>");
    groupImage.attr("src", "./img/group.jpg");
    groupImage.attr("class", "bigPicture");
	$("#groupImage").append(groupImage);

})

$("#group").on("click", function() {
	$("#group").hide();
	$("#user").show();
})


$(".userSubmit").on("click", function() {
	event.preventDefault();
	newUser = {
		name: nameInput.val().trim()
	};
	console.log(newUser);
	submitUser(newUser);
	$("#user").hide();
    chooseCharacter();
});

function submitUser(User) {
	$.ajax({
		method: "POST",
		url: "/api/users",
		data: newUser
	});
}

function chooseCharacter() {
	$("#chooseCharacter").show();
	for (var c = 0; c < characters.length; c++) {
        var characterDiv = $("<div class='characterImage'>")
        var name = $("<p>").text(characters[c].name)
        var characterImage = $("<img style='border-radius: 10px;'>")
        characterImage.attr("src", characters[c].image);
        characterImage.attr("data-state", characters[c].name);
        characterImage.attr("data-id", c);
        characterDiv.append(name, characterImage);
        if (c < 1) {
        	$(".char1").append(characterDiv)
        } else {
        	$(".char2").append(characterDiv)
        }
        
  	}

  	$("img").on("click", function() {
		var chosenCharacter = $(this).attr("data-state");
        var id = $(this).attr("data-id");
        var charImage = $("<br><img>");
        charImage.attr("src", characters[id].avatar);
        character = id;
        console.log(character);
        $("#characterChosen").append(chosenCharacter, charImage);
        $("#chooseCharacter").hide();
        showItems();
  	})
	
}

function showItems() {
	$("#chooseItems").show();
	if (backpack.length < 4) {
		$(".itemsList").empty();
		$(".itemsList2").empty();
	    for (var i = 0; i < allItems.length; i++) {
	        var potentialItem = $("<li>").text(allItems[i]);
	        potentialItem.attr("data-state", allItems[i]);
	        potentialItem.attr("data-id", i);
	        if (i < (allItems.length / 2)) {
	        	$(".itemsList").append(potentialItem)
	        } else {
	        	$(".itemsList2").append(potentialItem)
	        }
	    }

	    $("li").on("click", function() {
	        var chosen = $(this).attr("data-state");
	        var id = $(this).attr("data-id");
	        console.log(chosen);
	        backpack.push(chosen);
	        console.log(backpack);
	        allItems.splice(id, 1);
	        var backpackItem = $("<li>").text(chosen);
	        $(".backpackItems").append(backpackItem);
	        showItems();
	    })
	} else {
		console.log("backpack full");
		$("#ci").text("Here are your game choices!!");
		$(".itemColumns").hide();
		$(".startGame").on("click", function() {
			$("#chooseItems").hide();
			game();
		})
	}
}

function game() {
	$("#game").show();
	$("#sound").trigger("pause");
	// $(".statsBox").empty();
	// $(".statsBox").append("<big>Time: " + time + "<br>", "<big>Life Points: " + lifePoints + "<br>", "<big>Miles Walked: " + distanceTraveled + "<br>", "<big>Backpack Items: " + "<br>", backpack[0] + "<br>", backpack[1] + "<br>", backpack[2] + "<br>", backpack[3] + "<br>");
	console.log("Time Count: " + timeCount);
	console.log("Time: " + time);
	console.log("Life Points: " + lifePoints);
	if (lifePoints > 0) {
		if (distanceTraveled < 10) {
			obstacleChecker();
			if (obstacle === "none") {
				displayImage();
			} else {
				displayObstacle();
			}
		} else {
			winGame();
		}
	} else {
		loseGame();
	}
	$(".statsBox").empty();
	$(".statsBox").append("<big>Time: " + time + "<br>", "<big>Life Points: " + lifePoints + "<br>", "<big>Miles Walked: " + distanceTraveled + "<br>", "<big>Backpack Items: " + "<br>", backpack[0] + "<br>", backpack[1] + "<br>", backpack[2] + "<br>", backpack[3] + "<br>");
	
}

function winGame() {
	$("#game").hide();
	$(".gameOver").show();
	var winnerImage = $("<img>");
    winnerImage.attr("src", "./img/winner.jpg");
    winnerImage.attr("class", "bigPicture");
	$("#gameOverImage").append(winnerImage);
	console.log("you won");
}

function loseGame() {
	$("#game").hide();
	$(".gameOver").show();
	lifePoints = 0;
	var loserImage = $("<img>");
    loserImage.attr("src", "./img/dead.jpg");
    loserImage.attr("class", "bigPicture");
	$("#gameOverImage").append(loserImage);
	console.log("you died");
}

$("#game").on("click", function() {
	event.preventDefault();
	speedTimeMath();
	distanceMath();
	game();
});

function speedTimeMath() {
	if (timeCount < 11) {
		lifePoints -= lpph;
		timeCount ++;
		time = timeArray[timeCount];
	} else if (timeCount === 11) {
		speed -= .25;
		lpph = 8;
		lifePoints -= lpph;
		timeCount ++;
		time = timeArray[timeCount];
	} else {
		lpph = 8;
		lifePoints -= lpph;
		timeCount ++;
		time = timeArray[timeCount];
	}
}

function distanceMath() {
	if (obstacle === "none") {
		distanceTraveled += speed;
		$(".updateBox").empty();
		$(".updateBox").append("Distance (in miles) walked in the last hour: " + speed);
	}
}

function displayImage() {
	$("#gameImage").empty();
	var mainImage = $("<img>");
	if (timeCount < 11) {
	    mainImage.attr("src", characters[character].mainMovement[imageCount]);
	    mainImage.attr("class", "bigPicture");
		$("#gameImage").append(mainImage);
	} else {
		mainImage.attr("src", characters[character].nightMovement[imageCount]);
	    mainImage.attr("class", "bigPicture");
		$("#gameImage").append(mainImage);
	}
	nextImage();
}

function nextImage() {
	imageCount++;
	if (imageCount === characters[character].mainMovement.length) {
		imageCount = 0;
	}
}

function displayObstacle() {
    $("#gameImage").empty();
    var obstacleImage = $("<img>");
    if (timeCount < 11) {
        obstacleImage.attr("src", obstacle.dayImage[character]);
        obstacleImage.attr("class", "bigPicture");
        $("#gameImage").append(obstacleImage);
    } else {
        obstacleImage.attr("src", obstacle.nightImage[character]);
        obstacleImage.attr("class", "bigPicture");
        $("#gameImage").append(obstacleImage);
    }
	document.getElementById("sound").src = obstacle.sound;
    $("#sound").trigger("play");
}

var obstacleList = [
	{
		name: "bear",
		lpAffect: -20,
		timeAffect: 0,
		speedAffect: 0,
		dayImage: ["../img/dannyBearDay.gif", "../img/pennyBearDay.gif"],
		nightImage: ["../img/dannyBearNight.gif", "../img/pennyBearNight.gif"],
		sound: "../sounds/bear.mp3",
		deterrent: "Axe",
		text: "A wild bear has appeared!",
		success: "You pull out your axe and start swinging viciously.  You hit him! The bear cowers off. . .",
		failure: "No where to run, no where to hide! The bear attacks, but you play dead and he gets bored. You miraculously make it out alive. . . but barely."
	},
	{
		name: "river",
		lpAffect: -5,
		timeAffect: 0,
		speedAffect: 0,
		picture: "../img/river.png",
		dayImage: ["../img/river.png", "../img/river.png"],
        nightImage: ["../img/river.png", "../img/river.png"],
		sound: "../sounds/river.mp3",
		deterrent: "Flint",
		text: "You have reached a cold, raging river. You decide to cross it. . .",
		success: "The ice cracks as you fall in, scrambling to make it to the shore. You use your flint to start a fire and dry your clothes.",
		failure: "You fall in, and have no way to dry your clothes. You trudge on with sopping clothing, weary of the night to come."
	},
	{
		name: "broken bone",
		lpAffect: 0,
		timeAffect: 0,
		speedAffect: -.25,
		dayImage: ["../img/leg.jpg", "../img/leg.jpg"],
        nightImage: ["../img/leg.jpg", "../img/leg.jpg"],
		sound: "../sounds/scream.mp3",
		deterrent: "First-Aid-Kit",
		text: "SNAP! Your leg is broken!",
		success: "You wrap it in a splint and carry on.",
		failure: "You continue on with a disgustingly floppy leg, causing excrusiating pain."
	},
	{
		name: "cravasse",
		lpAffect: 0,
		timeAffect: 1,
		speedAffect: 0,
		dayImage: ["../img/cravasse.jpg", "../img/cravasse.jpg"],
        nightImage: ["../img/cravasse.jpg", "../img/cravasse.jpg"],
		sound: "../sounds/falling.mp3",
		deterrent: "Climbing gear",
		text: "You have encountered a gaping crevasse.",
		success: "You're a seasoned climber and traverse the gap with the climbing gear",
		failure: "You have no way across. You lose 4 hours searching for a way around."
	},
	{
		name: "frost bite",
		lpAffect: -10,
		timeAffect: 0,
		speedAffect: 0,
		dayImage: ["../img/frostbite.jpg", "../img/frostbite.jpg"],
        nightImage: ["../img/frostbite.jpg", "../img/frostbite.jpg"],
		sound: "../sounds/frost_bite.mp3",
		deterrent: "Hand-Warmers",
		text: "Jack Frost has nipped at your nose. Frostbite!",
		success: "Luckily you grabbed some hand-warmers to counteract the loss of feeling in your nose",
		failure: "You have nothing stop the frostbite. Your nose turns black and falls off."
	},
	{
		name: "altitude sickness",
		lpAffect: 0,
		timeAffect: 1,
		speedAffect: 0,
		dayImage: ["../img/altsick.jpg", "../img/altsick.jpg"],
        nightImage: ["../img/altsick.jpg", "../img/altsick.jpg"],
		sound: "../sounds/vomit.wav",
		deterrent: "Water",
		text: "Lost at 13,000 feet",
		success: "You have trained properly and come prepared. You avoid getting altitude sickenss",
		failure: "Your late night partying and lack of water causes severe altitude sickness."
	},
	{
		name: "blizzard",
		lpAffect: 0,
		timeAffect: 0,
		speedAffect: -.25,
		dayImage: ["../img/blizzard.gif", "../img/blizzard.gif"],
        nightImage: ["../img/blizzard.gif", "../img/blizzard.gif"],
		sound: "../sounds/snowstorm.mp3",
		deterrent: "Emergency-Blanket",
		text: "A blizzard rolls in causing white-out conditions. . .",
		success: "You wrap yourself in the emergency blanket and shield yourself from the harsh conditions.",
		failure: "The blizzard takes its toll, battering you relentlessly."
	},
	{
		name: "wolf",
		lpAffect: 0,
		timeAffect: 1,
		speedAffect: 0,
		dayImage: ["../img/dannyWolfDay.gif", "../img/pennyWolfDay.gif"],
        nightImage: ["../img/dannyWolfNight.gif", "../img/pennyWolfNight.gif"],
		sound: "../sounds/wolf.mp3",
		deterrent: "Food",
		text: "A ravenous wolf has appeared, and she looks hungry!",
		success: "You toss your remaining food and slowly back away. You successfully make your escape.",
		failure: "You have nothing to distract the hungry mother wolf. She attacks you as you barely make your escape."
	},
	// {
	// 	name: "darkness",
	// 	varAffected: 2,
	// 	picture: "../img/river.png",
	// 	dayImage: ["../img/dannyBearDay.gif", "../img/pennyBearDay.gif"],
 //        nightImage: ["../img/dannyBearNight.gif", "../img/pennyBearNight.gif"],
	// 	deterrent: "Flashlight" 
	// },
	{
		name: "yeti",
		lpAffect: 0,
		timeAffect: 0,
		speedAffect: 0,
		dayImage: ["../img/dannyYetiDay.gif", "../img/pennyYetiDay.gif"],
        nightImage: ["../img/dannyYetiNight.gif", "../img/pennyYetiNight.gif"],
		sound: "../sounds/yeti.mp3",
		deterrent: "Riddle",
		text: "Enter witty coding riddle here",
		success: "You solved the Yeti's riddle! You hop on his back and ride him halfway down the mountain!",
		failure: "The Yeti is unimpressed. He lifts you up and hurls you into a deep ravine!"
	}

];

var obstacleOdds = 0;
var obstacle = {};


function obstacleChecker() {
	var obstacleChance = Math.floor(Math.random() * 100);
	if (obstacleChance <= obstacleOdds) {
		var obstacleNumber = Math.floor(Math.random() * 100);
		if (obstacleNumber < 11) {
			obstacle = obstacleList[0]
		} else if (obstacleNumber < 22) {
			obstacle = obstacleList[1]
		} else if (obstacleNumber < 33) {
			obstacle = obstacleList[2]
		} else if (obstacleNumber < 44) {
			obstacle = obstacleList[3]
		} else if (obstacleNumber < 55) {
			obstacle = obstacleList[4]
		} else if (obstacleNumber < 66) {
			obstacle = obstacleList[5]
		} else if (obstacleNumber < 77) {
			obstacle = obstacleList[6]
		} else if (obstacleNumber < 88) {
			obstacle = obstacleList[7]
		} else {
			obstacle = obstacleList[8]
		}
		$(".updateBox").empty();
		$(".updateBox").append(obstacle.text);
		obstacleOdds = 10;
		var rightItem = false;
		for (var a = 0; a < backpack.length; a++) {
			if (backpack[a] === obstacle.deterrent) {
				$(".updateBox").append(obstacle.success);
				console.log("Your " + backpack[a] + " has saved your from the " + obstacle.name + "!");
				rightItem = true;
			}
		}
		if (!rightItem) {
			lifePoints += obstacle.lpAffect;
			timeCount += obstacle.timeAffect;
			lifePoints -= (obstacle.timeAffect * lpph);
			speed += obstacle.speedAffect;
			$(".updateBox").append(obstacle.failure);
		}
		console.log("speed: " + speed);
		console.log(obstacle);
		console.log(obstacleOdds);
	} else {
		obstacle = "none";
		console.log(obstacle);
		console.log("nothing to see here");
		obstacleOdds += 30;
		console.log(obstacleOdds);
	}

};

$(".restartGame").on("click", function() {
	document.location.reload()
});



// Character Constructor
// var Character = function(name, backpack, lifePoints) {
// 	this.name = name;
// 	this.backpack = []; // will this work?
// 	this.lifePoints = lifePoints;
// 	this.isAlive = function() {
// 	if (this.hitPoints > 0) {
// 		console.log(this.name + " is still alive!");
// 		console.log("\n---------------\n");
// 		return true;
// 	}
// 	console.log(this.name + " has died!");
// 		return false;
// 	}
// 	this.PrintStats = function() {
// 		console.log(this);	
// 	}
// 	this.itemSelect = function(i1, i2, i3, i4) {
// 		this.backpack.push(selectedItems);
// 	};
// }

// // Constructor to use global variables to pass through obstacle and character
// Character.prototype.reachObstacle = function(obstacle) {
// 	Character.lifePoints -= Obstacle.damage;
// }

// var dannyDanger = new Character("Danny Danger", "PUT_ARRAY_HERE", 100);
// var pennyPeril = new Character("Penny Peril", "PUT ARRAY HERE", 100);

// while (dannyDanger.isAlive() === true) {
// 	dannyDanger.PrintStats();
// 	dannyDanger.
// }	

// // User Constructor
// var Player = function(initials) {
// 	this.initials;
// 	this.score;
// }

// module.exports = Character;
// module.exports = Player;

})