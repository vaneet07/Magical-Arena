const Game = require('./game');

async function runGame() {
    const game = new Game();
    await game.start();
}

runGame();