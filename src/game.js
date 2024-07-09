// game.js
const Player = require('./player');
const Arena = require('./arena');

class Game {
    constructor(player1, player2) {
        this.players = [player1, player2].sort((a, b) => a.health - b.health);
    }
}

module.exports = Game;