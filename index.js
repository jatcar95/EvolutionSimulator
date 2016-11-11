var INITIAL_POPULATION = 16;
var INITIAL_FOOD_COUNT = 10;
var FPS = 30;
var MOVE_RATE = 30;
var WIDTH = 600;
var HEIGHT = 500;

var creatures = [];
var food = [];

window.onload = () => {
	createCreatures();
	createFood();
	console.log(creatures);
	creatures[0].observe(creatures, food);
	console.log(creatures[0].getDirection());
	var animationTimer = setInterval(draw, 1000.0 / FPS);
	var moveTimer = setInterval(moveCreatures, 1000.0 / MOVE_RATE);
}

function createCreatures() {
	for (var i = 0; i < INITIAL_POPULATION; i++) {
		var x = randInt(WIDTH - Creature.BASE_SIZE) + (Creature.BASE_SIZE / 2.0);
		var y = randInt(HEIGHT - Creature.BASE_SIZE) + (Creature.BASE_SIZE / 2.0);
		var traits = new Traits(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5);
		var creature = new Creature(traits, x, y);
		creatures.push(creature);
	}
}

function createFood() {
	for (var i = 0; i < INITIAL_FOOD_COUNT; i++) {
		var x = randInt(WIDTH - Food.SIZE) + (Food.SIZE / 2.0);
		var y = randInt(HEIGHT - Food.SIZE) + (Food.SIZE / 2.0);
		food.push(new Food(x, y));
	}
}

function draw() {
	var canvas = document.querySelector("#world");
	var pen = canvas.getContext("2d");
	// clear old creatures
	pen.clearRect(0, 0, canvas.width, canvas.height);
	pen.fillStyle = "green";
	for (var i = 0; i < food.length; i++) {
		pen.beginPath();
		pen.arc(food[i].x, food[i].y, Food.SIZE, 0, 2 * Math.PI);
		pen.fill();
	}

	pen.fillStyle = "black";	
	for (var i = 0; i < creatures.length; i++) {
		var creature = creatures[i];
		pen.fillRect(creature.location.x - creature.size() / 2.0, 
					 creature.location.y - creature.size() / 2.0,
					 creature.size(), creature.size());
	}
}

function moveCreatures() {
	var canvas = document.querySelector("#world");
	for (var i = 0; i < creatures.length; i++) {
		creatures[i].observe(creatures, food);
		var direction = creatures[i].getDirection();
		var speed = creatures[i].speed();
		move(creatures[i], direction, speed);
		// creatures[i].attack();
		// creatures[i].breed();
		// creatures[i].eat();
	}
}

function move(creature, direction, speed) {
	var x = 0;
	var y = 0;
	if (direction === "up") {
		y--;
	} else if (direction === "down") {
		y++;
	} else if (direction === "left") {
		x--;
	} else {
		x++;
	}
	if (creature.location.x + x + creature.size() / 2.0 <= WIDTH) {
		creature.location.x += x * speed;
	}
	if (creature.location.y + y + creature.size() / 2.0 <= HEIGHT) {
		creature.location.y += y * speed;
	}
	creature.age++;
}