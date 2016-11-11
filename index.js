var FPS = 30;
var WIDTH = 600;
var HEIGHT = 500;

var world;

window.onload = () => {
	world = new World();
	world.createCreatures();
	world.createFood();
	var animationTimer = setInterval(draw, 1000.0 / FPS);
	var moveTimer = setInterval(moveCreatures, 1000.0 / world.MOVE_RATE);
}

function draw() {
	var canvas = document.querySelector("#world");
	var pen = canvas.getContext("2d");
	// clear old creatures
	pen.clearRect(0, 0, canvas.width, canvas.height);
	pen.fillStyle = "green";
	for (var i = 0; i < world.food.length; i++) {
		pen.beginPath();
		pen.arc(world.food[i].x, world.food[i].y, Food.SIZE, 0, 2 * Math.PI);
		pen.fill();
	}

	pen.fillStyle = "black";	
	for (var i = 0; i < world.creatures.length; i++) {
		var creature = world.creatures[i];
		pen.fillRect(creature.location.x - creature.size() / 2.0, 
					 creature.location.y - creature.size() / 2.0,
					 creature.size(), creature.size());
	}
}

function moveCreatures() {
	var canvas = document.querySelector("#world");
	for (var i = 0; i < world.creatures.length; i++) {
		var creature = world.creatures[i];
		creature.observe(world);
		var direction = creature.getDirection();
		var speed = creature.speed();
		world.move(creature, direction, speed);
		var targetFood = creature.eat();
		if (targetFood) {
			world.allowEat(creature, targetFood);
		}
		// creatures[i].breed(world);
		// creatures[i].attack();
		// creatures[i].breed();
	}
}