World.INITIAL_POPULATION = 10;
World.INITIAL_FOOD_COUNT = 20;
World.MOVE_RATE = 10;
World.DEATH_RATE = 0.01;

function World () {
	this.creatures = [];
	this.food = [];
	this.move = move;
	this.createCreatures = createCreatures;
	this.createFood = createFood;
	this.allowEat = allowEat;
	this.kill = kill;
}

function createCreatures() {
	for (var i = 0; i < World.INITIAL_POPULATION; i++) {
		var x = randInt(WIDTH - Creature.BASE_SIZE) + (Creature.BASE_SIZE / 2.0);
		var y = randInt(HEIGHT - Creature.BASE_SIZE) + (Creature.BASE_SIZE / 2.0);
		var traits = new Traits(0.5, 0.5, 0.5, 0.5, 0.01, 0.01, 0.5);
		var creature = new Creature(traits, x, y);
		this.creatures.push(creature);
	}
}

function createFood() {
	for (var i = 0; i < World.INITIAL_FOOD_COUNT; i++) {
		var x = randInt(WIDTH - Food.SIZE) + (Food.SIZE / 2.0);
		var y = randInt(HEIGHT - Food.SIZE) + (Food.SIZE / 2.0);
		var value = Math.random();
		this.food.push(new Food(x, y, value));
	}
}

function move(creature, direction, speed) {
	if (creature.health <= 0) {
		this.kill(creature);
	} else {
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

		newX = creature.location.x + x * speed;
		newY = creature.location.y + y * speed;
		if (newX + creature.size() / 2.0 <= WIDTH && newX - creature.size() / 2.0 > 0) {
			creature.location.x += x * speed;
		}
		if (newY + creature.size() / 2.0 <= HEIGHT && newY - creature.size() / 2.0 > 0) {
			creature.location.y += y * speed;
		}

		creature.age++;
		if (creature.hunger > 1 || creature.breedDesire > 1) {
			creature.health -= World.DEATH_RATE * World.DEATH_RATE;
		} 

		if (creature.hunger <= 1) {
			creature.hunger += creature.traits.feedingRate * World.DEATH_RATE;
		}
		if (creature.breedDesire <= 1) {
			creature.breedDesire += creature.traits.breedingRate * World.DEATH_RATE;		
		}
	}
}

function allowEat(creature, food) {
	var index = this.food.indexOf(food);
	this.food.splice(index, 1);
	// hunger decreases by 50%
	creature.hunger -= creature.hunger * Food.HUNGER_MOD * food.value;
	// health increases by 25%
	creature.health = (creature.health + Food.HEALTH_MOD * food.value > 1) ? 
					   1 : 
					   creature.health + Food.HEALTH_MOD * food.value;
}

function kill(creature) {
	var location = creature.location;
	this.food.push(new Food(location.x, location.y, creature.size() / Creature.BASE_SIZE));
	var index = this.creatures.indexOf(creature);
	this.creatures.splice(index, 1);
}