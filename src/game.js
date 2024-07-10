const readline = require('readline');
const db = require('./db');
const Player = require('./player');
const Arena = require('./arena');

class Game {
    constructor() {
        this.arena = new Arena();
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    async start() { // CONSOLE STARTED AND USER INTERACTS WITH IT
        console.log("Welcome to the Magical Arena!");

        while (true){
            let task = parseInt(await this.askQuestion("Enter 1 to play a Match, Enter 2 to add a player , Enter 3 to end the game , Enter 4 to see previous matches\n"));

            if (task === 1){ // PLAY A MATCH
                let player1Id = parseInt(await this.askQuestion("Enter Player 1 Id: "));
                let player1 = db.getPlayer(player1Id);
                while (!player1){
                    player1Id = parseInt(await this.askQuestion("No such player exists. Please re-enter Player 1 Id: "));
                    player1 = db.getPlayer(player1Id);
                }
                let player2Id = parseInt(await this.askQuestion("Enter Player 2 Id: "));
                let player2 = db.getPlayer(player2Id);
                while (!player2){
                    player2Id = parseInt(await this.askQuestion("No such player exists. Please re-enter Player 2 Id: "));
                    player2 = db.getPlayer(player2Id);
                }
                
                const match = this.arena.startNewMatch(player1, player2);
                console.log(`New match started! Match ID: ${match.id}`);
                console.log(player1.getStats());
                console.log(player2.getStats());

                while (!match.isFinished()) {
                    console.log(`\n--- Round ${match.rounds.length + 1} ---`);
                    const roundResult = this.arena.playRound();
                    this.displayRoundResults(roundResult);
                    await this.waitForNextRound();
                }

                const winner = db.getPlayer(match.winnerId);
                console.log(`\n${winner.name} wins the game!`);
            }
            else if (task === 2){ // CREATE PLAYERS
                const player = await this.createPlayer();
                console.log(player.getStats());
                db.savePlayer(player);
            }
            else if (task === 3){ // END
                break;
            }
            else if (task === 4){ // GET PREVIOUS MATCHES DETAILS
                console.log(this.arena.getPreviousMatches());
            }
        }
        
        this.rl.close();

    }

    // PROMPTS THE USER WITH THE QUESTION AND RETURNS A PROMISE THAT RESOLVES WITH USER INPUT
    askQuestion(question) { 
        return new Promise((resolve) => {
            this.rl.question(question, resolve);
        });
    }

    displayRoundResults(roundResult) { //OUTPUTS ROUND RESULTS ON CONSOLE
        roundResult.actions.forEach(action => {
            const attacker = db.getPlayer(action.attacker);
            const defender = db.getPlayer(action.defender);
            console.log(`${attacker.name} attacks ${defender.name}`);
            console.log(`Attack roll: ${action.attackRoll}, Defense roll: ${action.defendRoll}`);
            console.log(`Attack Power: ${action.rawDamage}, Defense Power: ${action.defense}, Net Damage: ${action.netDamage}`);
            console.log(`${defender.name}'s health: ${defender.health}`);
        });
    }

    waitForNextRound() { // WAITS FOR THE USER TO PRESS ENTER TO CONTINUE WITH THE NEXT ROUND
        return new Promise((resolve) => {
            this.rl.question('Press Enter to continue to the next round...', () => {
                resolve();
            });
        });
    }

}

module.exports = Game;