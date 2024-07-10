const Dice = require('./dice'); // USES DICE ENTITY
const db = require('./db');

class Match {
    static currentMatchId = 1; // CURRENT MATCH ID
    constructor(player1 ,player2) {
        this.id = Match.currentMatchId++;
        this.player1Id = player1.id;
        this.player2Id = player2.id;
        this.rounds = [];
        this.winnerId = null;
        this.startTime = new Date(); // MATCH START TIMESTAM
        this.endTime = null;
        this.turn = 0;
    }

    playRound(){
        let player1 = db.getPlayer(this.player1Id);
        let player2 = db.getPlayer(this.player2Id);
        this.turn = (this.turn === 0) ? (player1.health < player2.health ? 1 : 2) : this.turn; // CHECK IF GAME HAS JUST STARTED, THEN DETERMINE WHO WILL ATTACK FIRST BASED ON LOWER HEALTH

        let roundResult = { // STORE AND ORGANIZE INFORMATION ABOUT THE CURRENT ROUND OF THE GAME
            roundNumber: this.rounds.length + 1,
            actions: [] // STORE DETAILS OF ACTIONS IN THE CURRENT ROUND
        };

        for (let i = 0; i < 2; i++) {
            // ASSIGN ATTACKER AND DEFENDER
            let attacker = (this.turn === 1) ? player1 : player2;
            let defender = (this.turn === 1) ? player2 : player1;

            const rollAttack = Dice.roll(); // ATTCKER ROLLS THE DICE
            const rollDefend = Dice.roll(); // DEFENDER ROLLS THE DICE

            const attackPower = attacker.attack*rollAttack; // ATTACK POWER
            const defensePower = defender.strength*rollDefend; // DEFENSE POWER

            const damage = Math.max(0, attackPower-defensePower); // CALCULATED DAMAGE 

            defender.takeDamage(damage); // DEFENDER TOOK THE DAMAGE, HEALTH REDUCED
            

            player1 = this.turn===1? attacker : defender;
            player2 = this.turn===1? defender : attacker; 

            roundResult.actions.push({ // PUSH CURRENT ROUND DETAILS IN ACTION ARRAY
                attacker:attacker.id,
                defender:defender.id,
                attackRoll:rollAttack,
                defendRoll: rollDefend,
                rawDamage: attackPower,
                defense: defensePower,
                netDamage: damage});
            
            this.turn = (this.turn === 1 ? 2:1); // SWITCH TURNS
            if (!defender.isAlive()) break;
        }

        this.rounds.push(roundResult); // STORE ROUND WISE RESULTS IN ARRAY

        if (!player1.isAlive() || !player2.isAlive()) {
            this.endTime = new Date();
            this.winnerId = player1.isAlive() ? player1.id : player2.id;
        }
        db.savePlayer(player1);
        db.savePlayer(player2);

        return roundResult;
    }

    isFinished() { // CHECK IF MATCH IS FINISHED
        return this.endTime !== null;
    }
}

module.exports = Match;