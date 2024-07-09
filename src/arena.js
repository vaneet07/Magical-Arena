const Dice = require('./dice'); // USES DICE ENTITY

class Arena {
    static fight(attacker, defender) { // FIGHT ROUND INITIATED BETWEEN BOTH PLAYERS
        const attackRoll = Dice.roll();
        const defendRoll = Dice.roll();

        const result = this.calculateDamage(attacker, defender, attackRoll, defendRoll);
        defender.takeDamage(result.netDamage);

        return result;
    }

    static calculateDamage(attacker, defender, attackRoll, defendRoll) { // CALCULATES DAMAGE DONE BY ATTACKER TO DEFENDER
        const damage = attacker.attack * attackRoll;
        const defense = defender.strength * defendRoll;

        const netDamage = Math.max(0, damage - defense);

        return {
            attackerRoll: attackRoll,
            defenderRoll: defendRoll,
            damage: damage,
            defense: defense,
            netDamage: netDamage
        };
    }
}

module.exports = Arena;