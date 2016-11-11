Food.SIZE = 4;
// how much hunger is reduced from eating food
Food.HUNGER_MOD = 0.5;
// how much health is increased from eating food
Food.HEALTH_MOD = 0.1;

function Food(x, y, value) {
	this.x = x;
	this.y = y;
	this.value = value;
}