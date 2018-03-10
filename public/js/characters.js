$(document).ready(function() {

// var Obstacle = require("./obsticles.js");

var time = ["6:00"]

var backpack = [];

var characters = [
	{
		name: "Danny Danger",
		image: "./img/danny.jpg",
		avatar: "./img/DannyDangerSmall.png"
	},
	{
		name: "Penny Peril",
		image: "./img/penny.jpg",
		avatar: "./img/PennyPerilSmall.png"
	}
];

var character = {};

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

var nameInput = $("#user-name");
var newUser;

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
	newUser = {
		name: nameInput.val().trim()
	};
	console.log(newUser);
	submitUser(newUser);
	$("#user").hide()
    chooseCharacter()
});

function submitUser(User) {
	// console.log("new user 2: " + newUser.name);
	$.ajax({
		method: "POST",
		url: "/api/users",
		data: newUser
	});
}

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
        character += chosenCharacter
        console.log(character)
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
		$("#chooseItems").hide()
		game()
	}
}

// game()

function game() {
	$("#game").show()
	var mainImage = $("<img>")
    mainImage.attr("src", "./img/pennyLeft.jpg");
    mainImage.attr("class", "bigPicture");
	$("#gameImage").append(mainImage)
	
	
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