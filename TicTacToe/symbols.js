function drawSymbols() {
    if (!state) {
        return;
    }
    let board = state.get2DBoard();
    let rotatingSymbols = getRotatingSymbols(board, state.isGameOver);
    for (var y = 0; y < 3; y++) {
        for (var x = 0; x < 3; x++) {
            if (board[x][y] == 0) {
                drawCross(x, y, rotatingSymbols[x][y]);
            } else if (board[x][y] == 1) {
                drawCircle(x, y, rotatingSymbols[x][y]);
            }
        }
    }
}

function drawCross(x, y, rotate) {
    push();
    translate(-gridSizeX + gridSizeX * x, -gridSizeY + gridSizeY * y, 0);
    if (rotate) {
        rotateY(-millis() / 1000);
    }
    ambientMaterial(0, 255, 0);
    rotateZ(PI * 0.25);
    cylinder(thickness, gridSizeX * 0.7);
    rotateZ(PI * 0.5);
    cylinder(thickness, gridSizeX * 0.7);
    pop();
}

function drawCircle(x, y, rotate) {
    push();
    translate(-gridSizeX + gridSizeX * x, -gridSizeY + gridSizeY * y, 0);
    if (rotate) {
        rotateY(-millis() / 1000);
    }
    ambientMaterial(255, 0, 0);
    torus(gridSizeX * 0.25, thickness);
    pop();
}

function getRotatingSymbols(board, isGameOver) {
    let rotatingSymbols = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    if (isGameOver) {
        for (var i = 0; i < 3; i++) {
            if (board[i][0] != -1 && board[i][0] == board[i][1] && board[i][1] == board[i][2]) {
                rotatingSymbols[i][0] = 1;
                rotatingSymbols[i][1] = 1;
                rotatingSymbols[i][2] = 1;
            }
            if (board[0][i] != -1 && board[0][i] == board[1][i] && board[1][i] == board[2][i]) {
                rotatingSymbols[0][i] = 1;
                rotatingSymbols[1][i] = 1;
                rotatingSymbols[2][i] = 1;
            }
        }
        if (board[1][1] != -1) {
            if (board[0][0] == board[1][1] && board[1][1] == board[2][2]) {
                rotatingSymbols[0][0] = 1;
                rotatingSymbols[1][1] = 1;
                rotatingSymbols[2][2] = 1;
            }
            if (board[0][2] == board[1][1] && board[1][1] == board[2][0]) {
                rotatingSymbols[0][2] = 1;
                rotatingSymbols[1][1] = 1;
                rotatingSymbols[2][0] = 1;
            }
        }
    }

    return rotatingSymbols;
}