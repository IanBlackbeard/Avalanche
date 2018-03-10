// var math = require("./math.js");

$(document).ready(function() {

// var Obstacle = require("./obsticles.js");


var time;

var timeArray = ["7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM", "12:00 AM", "1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM", "5:00 AM", "6:00 AM"]

var distanceTraveled = 0;

var backpack = [];

var lifePoints = 100;

var imageCount = 0;

var characters = [
	{
		name: "Danny Danger",
		image: "./img/danny.jpg",
		avatar: "./img/DannyDangerSmall.png",
		mainMovement: ["./img/dannyLeft.jpg", "./img/dannyMid.jpg", "./img/dannyRight.jpg"]
	},
	{
		name: "Penny Peril",
		image: "./img/penny.jpg",
		avatar: "./img/PennyPerilSmall.png",
		mainMovement: ["./img/pennyLeft.jpg", "./img/pennyMid.jpg", "./img/pennyRight.jpg"]
	}
];

var character;

var allItems = [
	"Food",
	"Flare gun",
	"Axe",
	"Emergency blanket",
	"Clothes",
	"Water",
	"Flint",
	"Shovel",
	"Knife",
	"Hand warmers"
];

// chooseCharacter()

$(".black-screen").show()
$(".story").show()
$(".story").on("click", function() {
	$(".black-screen").hide()
	$(".story").hide()
	$(".start-page").show()
})


$("#start-screen-img").on("click", function() {
	$(".start-page").hide()
	$(".black-screen").show()
    $("#user").show()
});


$(".userSubmit").on("click", function() {
	event.preventDefault()
	$("#user").hide()
    chooseCharacter()
});

function chooseCharacter() {
	$("#chooseCharacter").show()
	for (var c = 0; c < characters.length; c++) {
        var characterDiv = $("<div class='characterImage'>")
        var name = $("<p>").text(characters[c].name)
        var characterImage = $("<img>")
        characterImage.attr("src", characters[c].image);
        characterImage.attr("data-state", characters[c].name)
        characterImage.attr("data-id", c)
        characterDiv.append(name, characterImage)
        if (c < 1) {
        	$(".char1").append(characterDiv)
        } else {
        	$(".char2").append(characterDiv)
        }
        
  	}

  	$("img").on("click", function() {
		var chosenCharacter = $(this).attr("data-state")
        var id = $(this).attr("data-id")
        var charImage = $("<br><img>")
        charImage.attr("src", characters[id].avatar);
        character = id;
        console.log(character);
        $("#characterChosen").append(chosenCharacter, charImage)
        $("#chooseCharacter").hide()
        showItems()
  	})
	
}

function showItems() {
	$("#chooseItems").show()
	if (backpack.length < 4) {
		$(".itemsList").empty()
		$(".itemsList2").empty()
	    for (var i = 0; i < allItems.length; i++) {
	        // var couldUse = $("<li class='possibleItem'>")
	        var potentialItem = $("<li>").text(allItems[i])
	        potentialItem.attr("data-state", allItems[i])
	        potentialItem.attr("data-id", i)
	        // couldUse.append(p)
	        if (i < (allItems.length / 2)) {
	        	$(".itemsList").append(potentialItem)
	        } else {
	        	$(".itemsList2").append(potentialItem)
	        }
	        
	    	// console.log(i)
	    }

	    $("li").on("click", function() {
	        var chosen = $(this).attr("data-state")
	        var id = $(this).attr("data-id")
	        console.log(chosen)
	        backpack.push(chosen)
	        console.log(backpack)
	        allItems.splice(id, 1)
	        var backpackItem = $("<li>").text(chosen)
	        $(".backpackItems").append(backpackItem)
	        // console.log(id)
	        // console.log(allItems)
	        // console.log(backpack.length)
	        showItems()
	    })
	} else {
		console.log("backpack full")
		$(".itemColumns").hide()
		$(".startGame").on("click", function() {
			$("#chooseItems").hide()
			game()
		})
	}
}

// game()

function game() {
	if (lifePoints > 0) {
		$("#game").show()

		displayImage()

	} else {
		console.log("you died")
	}
	
}

function displayImage() {
	$("#gameImage").empty()
	var mainImage = $("<img>")
    mainImage.attr("src", characters[character].mainMovement[imageCount]);
    mainImage.attr("class", "bigPicture");
	$("#gameImage").append(mainImage)
	nextImage()
}

function nextImage() {
  imageCount++;
  if (imageCount === characters[character].mainMovement.length) {
    imageCount = 0;
  }
}

$("#game").on("click", function() {
	event.preventDefault()
	game()
})




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