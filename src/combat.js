const Dice = require('./dice'); // USES DICE ENTITY

class Combat {
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

module.exports = Combat;