class Database {
    constructor() {
        this.players = new Map();
        this.matches = new Map();
    }

    savePlayer(player) {
        this.players.set(player.id, player);
    }

    getPlayer(id) {
        return this.players.get(id);
    }

    saveMatch(match) {
        this.matches.set(match.id, match);
    }

    getMatch(id) {
        return this.matches.get(id);
    }
}

module.exports = new Database();