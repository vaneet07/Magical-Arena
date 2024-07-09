const Player = require('./player');
const Arena = require('./arena');
const readline = require('readline');

class Game {
    constructor(player1, player2) {
        this.players = [player1, player2].sort((a, b) => a.health - b.health); // SORTING PLAYERS ACCORDING TO THEIR HEALTH
        this.round = 1;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    async play() { // FUNCTION TO START THE GAME
        console.log("Welcome to the Magical Arena!");
        console.log(`${this.players[0].name} (Health: ${this.players[0].health}, Strength: ${this.players[0].strength}, Attack: ${this.players[0].attack})`);
        console.log(`${this.players[1].name} (Health: ${this.players[1].health}, Strength: ${this.players[1].strength}, Attack: ${this.players[1].attack})`);
        
        while (this.players[0].isAlive() && this.players[1].isAlive()) {
            console.log(`\n--- Round ${this.round} ---`);
            await this.playRound();
            this.round++;
            await this.waitForNextRound();
        }

        const winner = this.players[0].isAlive() ? this.players[0] : this.players[1];
        console.log(`\n${winner.name} wins the game!`);
        this.rl.close();
    }

    async playRound() { // FUNCTION TO PLAY GAME ROUND WISE      
        for (let i = 0; i < 2; i++) {
            const attacker = this.players[i];
            const defender = this.players[1 - i];

            if (!defender.isAlive()) break;

            const result = Arena.fight(attacker, defender);

            console.log(`${attacker.name} attacks ${defender.name}`);
            console.log(`Attack roll: ${result.attackerRoll}, Defense roll: ${result.defenderRoll}`);
            console.log(`Damage: ${result.damage}, Defense: ${result.defense}, Net damage: ${result.netDamage}`);
            console.log(`${defender.name}'s health: ${defender.health}`);
        }
    }

    waitForNextRound() {
        return new Promise((resolve) => {
            this.rl.question('Press Enter to continue to the next round...', () => {
                resolve();
            });
        });
    }
}

module.exports = Game;