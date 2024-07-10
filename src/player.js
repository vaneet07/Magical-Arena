// const { v4: uuidv4 } = require('uuid');

class Player {
    static currentId = 1;
    constructor(name, health, strength, attack) { //PLAYER ATTRIBUTES
        // this.id = uuidv4(); // New: Unique ID for each player
        this.id = Player.currentId++; // UNIQUE PLAYER ID IN FORM OF INT
        this.name = name;
        this.health = health;
        this.strength = strength;
        this.attack = attack;
        this.createdAt = new Date(); // TIMESTAMP WHEN PLAYER IS CREATED
        this.updatedAt = new Date(); // TIMESTAMP WHEN PLAYER STATS UPDATED
    }

    isAlive() { // CHECK IF PLAYER IS ALIVE OR DEAD
        return this.health > 0;
    }

    takeDamage(damage) { // REDUCES HEALTH OF PLAYER BY DAMAGE TAKEN
        this.health = Math.max(0, this.health - damage);
        this.updatedAt = new Date();
    }

    getStats() { // GET PLAYER STATS
        return `${this.name} (ID: ${this.id}, Health: ${this.health}, Strength: ${this.strength}, Attack: ${this.attack})`;
    }
}

module.exports = Player;