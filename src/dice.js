class Dice { // DICE WHICH RANDOMLY GENERATES INTEGER FROM 1 TO 6
    static roll() {
        return Math.floor(Math.random() * 6) + 1;
    }
}

module.exports = Dice;