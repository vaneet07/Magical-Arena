const readline = require('readline');
const Arena = require('./arena');

class Game {
    constructor(player1, player2) {
        this.arena = new Arena(player1, player2);
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    
}

module.exports = Game;