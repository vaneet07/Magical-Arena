// game.js
const Player = require('./player');
const Arena = require('./arena');

class Game {
    constructor(player1, player2) {
        this.players = [player1, player2].sort((a, b) => a.health - b.health); // SORTING PLAYERS ACCORDING TO THEIR HEALTH
    }

    play() {
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
}

module.exports = Game;