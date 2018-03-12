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

$(".black-screen").show();
$(".story").show();
$(".story").on("click", function() {
	$(".black-screen").hide();
	$(".story").hide();
	$(".start-page").show();
})


$("#start-screen-img").on("click", function() {
	$(".start-page").hide();
	$(".black-screen").show();
    $("#user").show();
});


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
	$(".statsBox").empty();
	$(".statsBox").append("<big>Time: " + time + "<br>", "<big>Life Points: " + lifePoints + "<br>", "<big>Miles Walked: " + distanceTraveled + "<br>", "<big>Backpack Items: " + "<br>", backpack[0] + "<br>", backpack[1] + "<br>", backpack[2] + "<br>", backpack[3] + "<br>");
	console.log("Time Count: " + timeCount);
	console.log("Time: " + time);
	console.log("Life Points: " + lifePoints);
	if (lifePoints > 0) {
		if (distanceTraveled < 10) {
			obstacleChecker();
			if (obstacle === "none") {
				displayImage();
				$(".updateBox").empty();
				$(".updateBox").append("Continue on your journey...");
			} else {
				displayObstacle();
			}
		} else {
			$("#gameImage").empty();
			var winnerImage = $("<img>");
		    winnerImage.attr("src", "./img/winner.jpg");
		    winnerImage.attr("class", "bigPicture");
			$("#gameImage").append(winnerImage);
			console.log("you won");
		}
	} else {
		$("#gameImage").empty();
		var deadImage = $("<img>");
	    deadImage.attr("src", "./img/dead.jpeg");
	    deadImage.attr("class", "bigPicture");
		$("#gameImage").append(deadImage);
		console.log("you died");
	}
	
}

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

$("#game").on("click", function() {
	event.preventDefault();
	speedTimeMath();
	distanceMath();
	game();
});

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
		text: "Oh no! You have encountered a bear and he is angry!...  ",
		success: "Fortunately, you have an axe in your backpack. You pull out your axe and start swinging viciously. You hit him! The bear cowers off and you continue on your way.",
		failure: "Nowhere to run, nowhere to hide! The bear attacks, but you have nothing in your backpack to help. You play dead and he gets bored. You miraculously make it out alive. . . but barely. You lose 20 life points as a result of your efforts."
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
		text: "Whoa! There is a cold, raging river crossing your path. It is much too far to go around so you must go through it. Unfortunately, you will get wet...  ",
		success: "The ice cracks as you fall in and you scramble to make it to the shore. Lucky for you, you have a flint in your backpack so you can start a fire, dry your clothes, and get back on your way.",
		failure: "You fall in and have nothing in your backpack to help you dry your clothes. You trudge on but are miserable. You lose 5 life points because you are now cold and wet."
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
		text: "Bad luck! You have fallen and broken your leg! That's going to make walking pretty difficult...  ",
		success: "Good thing you chose that first aid kit. You are able to splint your leg and hit the road again.",
		failure: "Sadly, there is nothing in your backpack to help you and you must continue on with a disgustingly floppy leg, causing you excrusiating pain. Your speed drops by 5% and that town is starting to seem a lot farther away."
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
		text: "Holy split in the mountain! You have come upon a very deep and menacing cravasse! What will you do?...  ",
		success: "You're a seasoned climber and wisely brought the climbing gear in your backpack. You can traverse the gap without falling to your death.",
		failure: "Unfortunately, you have brought nothing along that can help you cross the chasm. You lose an hour finding a safer path."
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
		text: "The cold has finally caught up with you and Jack Frost is nipping. You hands are numb and starting to turn a sickly shade of red. You have frostbite!...  ",
		success: "Luckily you grabbed some hand-warmers. You warm your hands and are good to go.",
		failure: "You have nothing in your backpack to stop the frostbite. You lose 10 life points because it is only going to get worse."
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
		text: "The altitude is getting to you and that big breakfast you had is starting to seem like a bad idea. You have altitude sickness!...  ",
		success: "Good thing you brought some water with you. You can chug it an feel better in no time.",
		failure: "You should always bring water with you when at altitude! Since you didn't grab the water, you lose the contents of your stomach and an hour pulling yourself back together before you can continue."
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
		text: "The weather has taken a turn for the worse. The sun is no longer shining and a blizzard has blown in! It's a white out and you can only see a few feet in front of you...  ",
		success: "You were smart to think that emergency blanket would come in handy. You can wrap yourself in it and forge ahead.",
		failure: "The blizzard batters you relentlessly and with nothing in your backpack to help you, your progress is seriously hindered. Your speed drops by 75%."
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
		text: "Gadzooks! There is a wolf in your way and he looks hungry!...  ",
		success: "You throw the food from your backpack at him and continue on yuour way without so much as a scratch.",
		failure: "Since you brought no food, you have nothing to distract the hungry wolf. You lose an hour running away from him."
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
		text: "Holy schnikes! Theres a yeti dead ahead! He is offering you a deal...if you answer a riddle correctly, he will personally carry you to safety. However, if your answer is wrong, he will eat you. Tough situation but now you are one of the few to have seen this elusive creature. Hopefully you will live to tell about it...  ",
		success: "You solved the Yeti's riddle! Hop on his back and ride down the mountain!",
		failure: "The Yeti is unimpressed. He eats you and you die!"
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

}



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