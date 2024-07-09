// game.js
const Player = require('./player');
const Arena = require('./arena');

class Game {
    constructor(player1, player2) {
        this.players = [player1, player2].sort((a, b) => a.health - b.health); // SORTING PLAYERS ACCORDING TO THEIR HEALTH
    }

    play() { // FUNCTION TO START THE GAME
        console.log("Game starts!");
        let round = 1;

        while (this.players[0].isAlive() && this.players[1].isAlive()) {
            console.log(`\nRound ${round}`);
            this.playRound();
            round++;
        }

        const winner = this.players[0].isAlive() ? this.players[0] : this.players[1];
        console.log(`\n${winner.name} wins the game!`);
    }

    playRound() { // FUNCTION TO PLAY GAME ROUND WISE
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
}

module.exports = Game;