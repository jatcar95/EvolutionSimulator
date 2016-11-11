var MUTATION_RATE = 0.9;
var MAX_BREED_DIF = 0.2;

Creature.INITIAL_HUNGER = 0.5;
Creature.INITIAL_BREED_DESIRE = 0.5;
Creature.BASE_SIZE = 15;
Creature.MAX_SPEED = 5;
Creature.MAX_SIGHT = 200;
Creature.MAX_HEARING = 200;
Creature.MAX_AGE = 100;

function Creature(traits, xCoord, yCoord) {
	this.traits = traits;
	this.age = 0;
	this.health = 1.0;
	this.size = size;
	this.hunger = Creature.INITIAL_HUNGER;
	this.breedDesire = Creature.INITIAL_BREED_DESIRE;
	this.location = {x: xCoord, y: yCoord};
	this.mates = [];
	this.food = [];
	this.intent = intent;
	this.breed = breed;
	this.observe = observe;
	this.getDirection = getDirection;
	this.speed = speed;
}

function Traits(strength, speed, sight, hearing, feedingRate,
				breedingRate, socialness) {
	this.strength = strength;
	this.speed = speed;
	this.sight = sight;
	this.hearing = hearing;
	this.feedingRate = feedingRate;
	this.breedingRate = breedingRate;
	this.socialness = socialness;
}

function breed(other) {
	var traits = new Traits(avg(this.traits.strength, other.traits.strength), 
							avg(this.traits.speed, other.traits.speed),
							avg(this.traits.sight, other.traits.sight),
							avg(this.traits.hearing, other.traits.hearing),
							avg(this.traits.feedingRate, other.traits.feedingRate),
							avg(this.traits.breedingRate, other.traits.breedingRate),
							avg(this.traits.socialness, other.traits.socialness));
	if (Math.random() <= MUTATION_RATE) {
		mutate(traits);
	}
	return new Creature(traits, other.location.x, other.location.y);
}

function observe(creatures, food) {
	var canvas = document.querySelector("#world");
	var sightDist = Creature.MAX_SIGHT * this.traits.sight;
	this.mates = [];
	this.food = [];
	for (var i = 0; i < creatures.length; i++) {
		if (!(creatures[i].location.x == this.location.x && creatures[i].location.y == this.location.y) && 
				Math.abs(creatures[i].location.x - this.location.x) <= sightDist &&
				Math.abs(creatures[i].location.y - this.location.y) <= sightDist && 
				canMate(this, creatures[i])) {
			if (this.mates[distBetween(this.location, creatures[i].location)] == null) {
				this.mates[distBetween(this.location, creatures[i].location)] = [];
			}
			this.mates[distBetween(this.location, creatures[i].location)].push(creatures[i]);
		}
	}

	for (var i = 0; i < food.length; i++) {
		if (!(food[i].x == this.location.x && food[i].y == this.location.y) && 
				Math.abs(food[i].x - this.location.x) <= sightDist &&
				Math.abs(food[i].y - this.location.y) <= sightDist && 
				canMate(this, creatures[i])) {
			if (this.food[distBetween(this.location, food[i])] == null) {
				this.food[distBetween(this.location, food[i])] = [];
			}
			this.food[distBetween(this.location, food[i])].push(food[i]);
		}
	}
}

function getDirection() {
	var intent = this.intent();
	if (intent === "eat") {
		var closestFood = this.food[Object.keys(this.food)[0]][0];
		if (Math.abs(closestFood.x - this.location.x) > Math.abs(closestFood.y - this.location.y)) {
			if (closestFood.x > this.location.x) {
				return "right";
			} else {
				return "left";
			}
		} else {
			if (closestFood.y > this.location.y) {
				return "down";
			} else {
				return "up";
			}
		}
	} else if (intent === "breed") {
		var closestMate = this.mates[Object.keys(this.mates)[0]][0];
		if (Math.abs(closestMate.location.x - this.location.x) > Math.abs(closestMate.location.y - this.location.y)) {
			if (closestMate.location.x > this.location.x) {
				return "right";
			} else {
				return "left";
			}
		} else {
			if (closestMate.location.y > this.location.y) {
				return "down";
			} else {
				return "up";
			}
		}
	} else { // intent === "search"
		return "blah";
	}
}

function avg(first, second) {
	return (first + second) / 2.0;
}

function randInt(numVals) {
	return Math.floor(Math.random() * numVals);
}

function mutate(traits) {
	var trait = randInt(7);
	var keys = Object.keys(traits);
	traits[keys[trait]] = Math.random();
}

function size() {
	return Creature.BASE_SIZE;
}

function intent() {
	if (this.mates.length > 0 && this.food.length > 0) {
		if (this.hunger > this.breedDesire) {
			return "eat";
		} else {
			return "breed";
		}
	} else if (this.mates.length > 0) {
		return "breed";
	} else if (this.food.length > 0) {
		return "eat";
	} else {
		return "search";
	}
}

function canMate(creature1, creature2) {
	for (var i = 0; i < creature1.traits.length; i++) {
		if (Math.abs(creature1.traits[creature1.traits.keys[i]] - creature2.traits[creature1.traits.keys[i]]) > MAX_BREED_DIF) {
			return false;
		} 
	}
	return true;
}

function distBetween(location1, location2) {
	return Math.abs(location1.x - location2.x) + Math.abs(location1.y - location2.y);
}

function speed() {
	return Creature.MAX_SPEED * this.traits.speed;
}
