const Dice = require('./dice'); // USES DICE ENTITY

class Arena {
    static fight(attacker, defender) { // FIGHT FUNCTION CALCULATES DAMAGE DONE BY ATTACKER TO DEFENDER 
        const attackRoll = Dice.roll();
        const defendRoll = Dice.roll();

        const damage = attacker.attack * attackRoll;
        const defense = defender.strength * defendRoll;

        const netDamage = Math.max(0, damage - defense);
        defender.takeDamage(netDamage);

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