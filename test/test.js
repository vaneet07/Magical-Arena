const { expect } = require('chai');
import Player from '../src/player'
import Match from '../src/match'
import Arena from '../src/arena'
import db from '../src/db'

describe('Player Class', function() {
    let player;
    
    beforeEach(function() {
        player = new Player('Test Player', 100, 10, 15);
    });

    it('should initialize with the correct attributes', function() {
        expect(player.name).to.equal('Test Player');
        expect(player.health).to.equal(100);
        expect(player.strength).to.equal(10);
        expect(player.attack).to.equal(15);
        expect(player.isAlive()).to.be.true;
        expect(player.getStats()).to.include('Test Player');
    });

    it('should have a unique id for each player', function() {
        const player2 = new Player('Another Player', 100, 10, 15);
        expect(player.id).to.not.equal(player2.id);
    });

    it('should reduce health correctly when takeDamage is called', function() {
        player.takeDamage(30);
        expect(player.health).to.equal(70);
    });

    it('should not have negative health', function() {
        player.takeDamage(200);
        expect(player.health).to.equal(0);
    });

    it('should correctly determine if player is alive', function() {
        player.takeDamage(100);
        expect(player.isAlive()).to.be.false;
    });

    it('should update the updatedAt timestamp when takeDamage is called', function() {
        const originalUpdatedAt = player.updatedAt;
        player.takeDamage(10);
        expect(player.updatedAt).to.not.equal(originalUpdatedAt);
    });
});

describe('Match Class', function() {
    let player1, player2, match;

    beforeEach(function() {
        player1 = new Player('Player 1', 100, 10, 15);
        player2 = new Player('Player 2', 100, 10, 15);
        db.savePlayer(player1);
        db.savePlayer(player2);
        match = new Match(player1, player2);
    });

    it('should initialize with correct attributes', function() {
        expect(match.player1Id).to.equal(player1.id);
        expect(match.player2Id).to.equal(player2.id);
        expect(match.rounds).to.be.an('array').that.is.empty;
        expect(match.winnerId).to.be.null;
        expect(match.turn).to.equal(0);
    });

    it('should play a round and update players health', function() {
        match.playRound();
        const updatedPlayer1 = db.getPlayer(player1.id);
        const updatedPlayer2 = db.getPlayer(player2.id);
        expect(match.rounds).to.have.lengthOf(1);
        expect(updatedPlayer1.health).to.be.below(100);
        expect(updatedPlayer2.health).to.be.below(100);
    });

    it('should end the match when a player dies', function() {
        player1.takeDamage(100);
        db.savePlayer(player1);
        match.playRound();
        expect(match.isFinished()).to.be.true;
        expect(match.winnerId).to.equal(player2.id);
    });
});

describe('Arena Class', function() {
    let arena, player1, player2;

    beforeEach(function() {
        arena = new Arena();
        player1 = new Player('Player 1', 100, 10, 15);
        player2 = new Player('Player 2', 100, 10, 15);
        db.savePlayer(player1);
        db.savePlayer(player2);
    });

    it('should start a new match', function() {
        const match = arena.startNewMatch(player1, player2);
        expect(match.player1Id).to.equal(player1.id);
        expect(match.player2Id).to.equal(player2.id);
        expect(arena.getCurrentMatch()).to.equal(match);
    });

    it('should play a round in the current match', function() {
        arena.startNewMatch(player1, player2);
        const roundResult = arena.playRound();
        expect(roundResult).to.be.an('object');
        expect(roundResult.actions).to.be.an('array');
    });

    it('should store previous matches when a match ends', function() {
        player1.takeDamage(100);
        db.savePlayer(player1);
        arena.startNewMatch(player1, player2);
        arena.playRound();
        expect(arena.getPreviousMatches()).to.have.lengthOf(1);
    });

    it('should throw an error if there is no active match', function() {
        expect(() => arena.playRound()).to.throw(Error, "No active match in the arena");
    });
});
