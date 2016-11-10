var MUTATION_RATE = 0.9;

Creature.INITIAL_HUNGER = 0.5;
Creature.INITIAL_BREED_DESIRE = 0.5;
Creature.BASE_SIZE = 5;
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
	this.move = move;
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
		if (Math.abs(creatures[i].location.x - this.location.x) <= sightDist &&
			Math.abs(creatures[i].location.y - this.location.y) <= sightDist && 
			canMate(this, creatures[i])) {
			this.mates[distBetween(this.location, creatures[i].location)].push(creatures[i]);
		}
	}

	for (var i = 0; i < food.length; i++) {
		if (Math.abs(food[i].x - this.location.x) <= sightDist &&
			Math.abs(food[i].y - this.location.y) <= sightDist && 
			canMate(this, creatures[i])) {
			this.food[distBetween(this.location, food[i])].push(food[i]);
		}
	}
}

function move() {
	var speed = Creature.MAX_SPEED * this.traits.speed;
	var hungry = this.hunger > this.breedDesire ? true : false;

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
		if ()
	}
}