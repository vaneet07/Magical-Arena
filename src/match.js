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

    static fight(attacker, defender) { // FIGHT ROUND INITIATED BETWEEN BOTH PLAYERS
        const attackRoll = Dice.roll();
        const defendRoll = Dice.roll();

        const damage = this.calculateDamage(attacker, defender, attackRoll, defendRoll);
        defender.takeDamage(damage.netDamage);

        return {
            attacker: attacker.name,
            defender: defender.name,
            ...damage
        };
    }

    static calculateDamage(attacker, defender, attackRoll, defendRoll) { // CALCULATES DAMAGE DONE BY ATTACKER TO DEFENDER
        const rawDamage = attacker.attack * attackRoll;
        const defense = defender.strength * defendRoll;
        
        const netDamage = Math.max(0, rawDamage - defense);

        return {
            attackRoll,
            defendRoll,
            rawDamage,
            defense,
            netDamage
        };
    }
}

module.exports = Match;