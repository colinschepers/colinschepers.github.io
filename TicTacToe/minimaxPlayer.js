class MiniMaxPlayer {
    constructor(runningTimeInMilliseconds, depthLimit) {
        this.runningTimeInMilliseconds = runningTimeInMilliseconds;
        this.depthLimit = depthLimit;
    }

    async getMove(state) {
        let depthLimit = this.depthLimit || 10;
        let timeout = Date.now() + (this.runningTimeInMilliseconds || 200);
        return this.__iterativeDeepening(state, depthLimit, timeout);
    }

    opponentMoved(move) {
        // do nothing
    }

    __iterativeDeepening(state, depthLimit, timeout) {
        let bestMove = null;
        for (let d = 1; d < depthLimit; d++) {
            let move = this.__getBestMove(state, d, timeout);
            if (Date.now() < timeout) {
                bestMove = move;
            } else {
                break;
            }
        }
        return bestMove || state.getValidMoves()[0];
    }

    __getBestMove(state, depthLimit, timeout) {
        let bestScore = -Infinity;
        let bestMove = null;
        for (let move of state.getValidMoves()) {
            var nextState = state.clone();
            nextState.play(move);

            let score = this.__getScore(nextState, 1, depthLimit, state.getPlayerToMove(), -Infinity, Infinity, timeout);

            if (score > bestScore || (score == bestScore && Math.random() < 0.5)) {
                bestScore = score;
                bestMove = move;
            }

            if (Date.now() >= timeout) {
                break;
            }
        }


        return bestMove;
    }

    __getScore(state, depth, depthLimit, maxPlayerNr, alpha, beta, timeout) {

        if (state.isGameOver || depth > depthLimit || Date.now() >= timeout) {
            return maxPlayerNr == 0 ? state.score : -state.score;
        }

        let bestScore = 0.5;

        if (state.getPlayerToMove() == maxPlayerNr) {
            bestScore = -Infinity;
            for (let move of state.getValidMoves()) {
                let nextState = state.clone();
                nextState.play(move);

                let score = this.__getScore(nextState, depth + 1, depthLimit, maxPlayerNr, alpha, beta);
                bestScore = Math.max(bestScore, score);
                alpha = Math.max(alpha, bestScore);
                if (beta <= alpha) {
                    break;
                }
            }
        } else {
            bestScore = Infinity;
            for (let move of state.getValidMoves()) {
                let nextState = state.clone();
                nextState.play(move);

                // console.log('depth: ' + depth + ' | move: ' +  move + ' | score: ' +  nextState.score);

                let score = this.__getScore(nextState, depth + 1, depthLimit, maxPlayerNr, alpha, beta);
                bestScore = Math.min(bestScore, score);
                alpha = Math.min(beta, bestScore);
                if (beta <= alpha) {
                    break;
                }
            }
        }

        return bestScore;
    }
}