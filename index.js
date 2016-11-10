var INITIAL_POPULATION = 50;
var FPS = 30;
var MOVE_RATE = 15;

var creatures = [];
var food = [];

window.onload = () => {
	createCreatures();
	console.log(creatures);
	var animationTimer = setInterval(draw, 1000.0 / FPS);
	var moveTimer = setInterval(moveCreatures, 1000.0 / MOVE_RATE);
}

function createCreatures() {
	for (var i = 0; i < INITIAL_POPULATION; i++) {
		var traits = new Traits(1, 1, 1, 1, 1, 1, 1);
		var creature = new Creature(traits, (i + 1) * 5, (i + 1) * 5);
		creatures.push(creature);
	}
}

function draw() {
	var canvas = document.querySelector("#world");
	var pen = canvas.getContext("2d");
	// clear old creatures
	pen.clearRect(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < creatures.length; i++) {
		var creature = creatures[i];
		pen.fillRect(creature.location.x - creature.size / 2.0, 
					 creature.location.y - creature.size / 2.0,
					 creature.size, creature.size);
	}
}

function moveCreatures() {
	var canvas = document.querySelector("#world");
	for (var i = 0; i < creatures.length; i++) {
		creatures[i].observe(creatures, food);
		creatures[i].move();
		creatures[i].attack();
		creatures[i].breed();
		creatures[i].eat();
	}
}