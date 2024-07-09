const Combat = require('./combat');

class Arena {
    constructor(player1, player2) {
        this.players = [player1, player2].sort((a, b) => a.health - b.health); // SORTING PLAYERS ACCORDING TO THEIR HEALTH
        this.round = 1;
    }

    playRound() { // FUNCTION TO PLAY GAME ROUND WISE 
        const results = [];
        for (let i = 0; i < 2; i++) {
            const attacker = this.players[i];
            const defender = this.players[1 - i];

            if (!defender.isAlive()) break;

            const result = Combat.resolveCombat(attacker, defender);
            results.push(result);
        }
        this.round++;
        return results;
    }

    isGameOver() { // CHECK IF THE GAME HAS ENDED MEANS ONE PLAYER IS DEAD
        return !this.players[0].isAlive() || !this.players[1].isAlive();
    }

    getWinner() { // RETRIEVE WINNER PLAYER ATTRIBUTES
        if (!this.isGameOver()) return null;
        return this.players[0].isAlive() ? this.players[0] : this.players[1];
    }
}

module.exports = Arena;