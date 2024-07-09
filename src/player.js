class Player {
    constructor(name, health, strength, attack) { //PLAYER ATTRIBUTES
        this.name = name;
        this.health = health;
        this.strength = strength;
        this.attack = attack;
    }

    isAlive() { // CHECK IF PLAYER IS ALIVE OR DEAD
        return this.health > 0;
    }

    takeDamage(damage) { // REDUCES HEALTH OF PLAYER BY DAMAGE TAKEN
        this.health = Math.max(0, this.health - damage);
    }

    getStats() { // GET PLAYER STATS
        return `${this.name} (Health: ${this.health}, Strength: ${this.strength}, Attack: ${this.attack})`;
    }
}

module.exports = Player;