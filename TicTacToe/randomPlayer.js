class RandomPlayer {
    async getMove(state) {
        //await sleep(100);
        var moves = state.getValidMoves();
        var randomNr = Math.floor((Math.random() * moves.length));
        return moves[randomNr];
    }

    opponentMoved(move) {
        // do nothing
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}