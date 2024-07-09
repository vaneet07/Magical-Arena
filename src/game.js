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

    async start() { // GAME STARTED
        console.log("Welcome to the Magical Arena!");
        console.log(this.arena.players[0].getStats());
        console.log(this.arena.players[1].getStats());

        while (!this.arena.isGameOver()) {
            console.log(`\n--- Round ${this.arena.round} ---`);
            const results = this.arena.playRound();
            this.displayRoundResults(results);
            await this.waitForNextRound();
        }

        const winner = this.arena.getWinner();
        console.log(`\n${winner.name} wins the game!`);
        this.rl.close();
    }

    displayRoundResults(results) { // OUTPUTS EACH ROUND RESULTS AND STATS OF PLAYERS
        results.forEach(result => {
            console.log(`${result.attacker} attacks ${result.defender}`);
            console.log(`Attack roll: ${result.attackRoll}, Defense roll: ${result.defendRoll}`);
            console.log(`Raw Damage: ${result.rawDamage}, Defense: ${result.defense}, Net damage: ${result.netDamage}`);
            const defender = this.arena.players.find(p => p.name === result.defender);
            console.log(`${defender.name}'s health: ${defender.health}`);
        });
    }

    waitForNextRound() { // PROMISE FOR NEXT ROUND WHERE USER WILL INTERACT TO CONTINUE THE GAME
        return new Promise((resolve) => {
            this.rl.question('Press Enter to continue to the next round...', () => {
                resolve();
            });
        });
    }
    
}

module.exports = Game;