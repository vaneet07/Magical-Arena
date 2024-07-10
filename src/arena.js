const db = require('./db');
const Match = require('./match');

class Arena {
    constructor() {
        this.currentMatch = null;
        this.previousMatches = [];
    }

    startNewMatch(player1, player2) { // START A MATCH
        this.currentMatch = new Match(player1, player2);
        db.saveMatch(this.currentMatch);
        return this.currentMatch;
    }

    playRound() { // PLAY A ROUND IN CURRENT MATCH
        // CHECK IF THERE IS AN ACTIVE MATCH
        if (!this.currentMatch || this.currentMatch.isFinished()) {
            throw new Error("No active match in the arena");
        }
        
        const roundResult = this.currentMatch.playRound();
        db.saveMatch(this.currentMatch);
        
        // IF MATCH FINISHED, ADD IT TO PREVIOUS MATCHES AND RESET CURRENT MATCH
        if (this.currentMatch.isFinished()){
            this.previousMatches.push(this.currentMatch.id);
            this.currentMatch = null;
        }

        return roundResult;
    }

    getCurrentMatch() { // GET CURRENT MATCH
        return this.currentMatch;
    }

    getPreviousMatches(){ // GET ALL PREV MATCHES
        let matches = [];
        for (let i in this.previousMatches){
            matches.push(db.getMatch(this.previousMatches[i]));
        }
        return matches;
    }

}

module.exports = Arena;