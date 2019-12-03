const width = 400;
const height = 400;
const thickness = 10;
const gridSizeX = (width - 2 * thickness) / 3;
const gridSizeY = (height - 2 * thickness) / 3;
const bg_color = 150;

var players = [new HumanPlayer(), new HumanPlayer()];
var state = new State();
var awaitingMove = false;
var winningLine = [];
var animation_alpha = 0;

var aniRotation = 0;
var aniStep = 0;
var aniPercentage = 0;
var aniCenter = [];
var aniStates = [];

function setup() {
    createCanvas(width, height, WEBGL);

    createP('');

    selO = createButton('New Game');
    selO.mousePressed(newGame);
    selX = createSelect();
    selX.option('Human');
    selX.option('Random');
    selX.changed(selectPlayerEvent);
    selO = createSelect();
    selO.option('Human');
    selO.option('Random');
    selO.value('Human');
    selO.changed(selectPlayerEvent);

    //debugMode(600, 50, 0, 300, 0, 600, -300, -300, 0);

    newGame();
}

function draw() {
    background(bg_color);

    frameRate(30);

    updateState();

    let v = createVector(mouseX - width / 2, mouseY - width / 2, 0);
    v.normalize();
    directionalLight(255, 255, 255, v);
    noStroke();

    if (state.isGameOver) {
        animate();
    }

    drawFrame();
    drawState();

    orbitControl();
}

function updateState() {
    if (!state.isGameOver) {
        if (!awaitingMove) {
            move();
        }
    } else if (state.score == 0.5) {
        // its a draw
    } else {
        // we have a winner!
        calculateWinningLine();
    }
}

function move() {
    awaitingMove = true;

    var roundNr = state.roundNr;
    var playerToMove = players[state.getPlayerToMove()];

    if (playerToMove.constructor.name !== 'HumanPlayer') {
        playerToMove
            .getMove(state)
            .catch(e => {
                console.error(e);
            })
            .then((move) => {
                if (roundNr == state.roundNr) {
                    state.play(move);
                }
                awaitingMove = false;
            });
    }
}

function calculateWinningLine() {
    var board = state.get2DBoard();
    for (var i = 0; i < 3; i++) {
        if (board[i][0] != -1 && board[i][0] == board[i][1] && board[i][1] == board[i][2]) {
            winningLine[i][0] = 1;
            winningLine[i][1] = 1;
            winningLine[i][2] = 1;
        }
        if (board[0][i] != -1 && board[0][i] == board[1][i] && board[1][i] == board[2][i]) {
            winningLine[0][i] = 1;
            winningLine[1][i] = 1;
            winningLine[2][i] = 1;
        }
    }
    if (board[1][1] != -1) {
        if (board[0][0] == board[1][1] && board[1][1] == board[2][2]) {
            winningLine[0][0] = 1;
            winningLine[1][1] = 1;
            winningLine[2][2] = 1;
        }
        if (board[0][2] == board[1][1] && board[1][1] == board[2][0]) {
            winningLine[0][2] = 1;
            winningLine[1][1] = 1;
            winningLine[2][0] = 1;
        }
    }
}

function drawState() {
    push();

    translate(-gridSizeX, -gridSizeY, 0);

    var board = state.get2DBoard();
    for (var y = 0; y < 3; y++) {
        for (var x = 0; x < 3; x++) {
            if (board[x][y] == 0) {
                if (winningLine[x][y]) {
                    rotation = millis() / 1000;
                    rotateY(-rotation);
                    drawCross();
                    rotateY(rotation);
                } else {
                    drawCross();
                }
            } else if (board[x][y] == 1) {
                if (winningLine[x][y]) {
                    rotation = millis() / 1000;
                    rotateY(-rotation);
                    drawCircle();
                    rotateY(rotation);
                } else {
                    drawCircle();
                }
            }
            translate(gridSizeX, 0, 0);
        }
        translate(-gridSizeX * 3, gridSizeY, 0);
    }

    pop();
}

function drawCross() {
    push();
    ambientMaterial(0, 255, 0);
    rotateZ(PI * 0.25);
    cylinder(thickness, gridSizeX * 0.7);
    rotateZ(PI * 0.5);
    cylinder(thickness, gridSizeX * 0.7);
    pop();
}

function drawCircle() {
    push();
    ambientMaterial(255, 0, 0);
    torus(gridSizeX * 0.25, thickness);
    pop();
}

function drawFrame() {
    push();

    ambientMaterial(0, 155, 199);

    translate(-width / 2 + thickness, 0, 0);
    cylinder(thickness, height);
    for (var i = 0; i < 3; i++) {
        translate((width - 2 * thickness) / 3, 0, 0);
        cylinder(thickness, height);
    }

    rotateZ(PI / 2);
    translate(-height / 2 + thickness, width / 2 - thickness, 0);
    cylinder(thickness, width);

    for (i = 0; i < 3; i++) {
        translate((height - 2 * thickness) / 3, 0, 0);
        cylinder(thickness, width);
    }

    pop();
}

function animate() {
    if (state.score == 0.5) {
        aniRotation += 0.01;
        rotateX(aniRotation);
        return;
    }

    if (aniStates.length == 0) {
        fillAnimationStates();
    }

    if (aniStates.length > 0) {
        aniPercentage += 0.01;

        let startX = aniStates[aniStep][0];
        let startY = aniStates[aniStep][1];
        let startZ = aniStates[aniStep][2];
        let endX = aniStates[(aniStep + 1) % aniStates.length][0];
        let endY = aniStates[(aniStep + 1) % aniStates.length][1];
        let endZ = aniStates[(aniStep + 1) % aniStates.length][2];
        let x = startX + aniPercentage * (endX - startX);
        let y = startY + aniPercentage * (endY - startY);
        let z = startZ + aniPercentage * (endZ - startZ);

        camera(x, y, z, aniCenter[0], aniCenter[1], aniCenter[2], 0, 1, 0);

        if (aniPercentage >= 1.0) {
            aniPercentage = 0;
            aniStep = (aniStep + 1) % aniStates.length;
        }
    }
}

function fillAnimationStates() {
    let gridSizeX = -width / 3;
    let gridSizeY = -height / 3;

    for (var i = 0; i < 3; i++) {
        if (winningLine[0][i] && winningLine[1][i] && winningLine[2][i]) {
            let y = gridSizeY - gridSizeY * i
            aniStates = [
                [0, 0, 350],
                [-gridSizeX * 5, 0, 0],
                [0, 0, -350],
                [gridSizeX * 5, 0, 0]
            ];
            aniCenter = [0, y, 0]
            return;
        } else if (winningLine[i][0] && winningLine[i][1] && winningLine[i][2]) {
            let x = gridSizeX - gridSizeX * i
            aniStates = [
                [0, 0, 350],
                [0, gridSizeY * 5, 0],
                [0, 0, -350],
                [0, -gridSizeY * 5, 0]
            ];
            aniCenter = [x, 0, 0]
            return;
        }
    }
}

function mouseReleased() {
    if (!state.isGameOver) {
        var playerToMove = players[state.getPlayerToMove()];
        if (playerToMove.constructor.name === 'HumanPlayer') {
            var x = Math.floor(mouseX / (width / 3));
            var y = Math.floor(mouseY / (height / 3));
            var move = y * 3 + x;
            if (x >= 0 && x < 3 && y >= 0 && y < 3 && state.isValid(move)) {
                state.play(move);
                awaitingMove = false;
            }
        }
    }
}

function newGame() {
    state = new State();
    awaitingMove = false;
    winningLine = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    aniRotation = 0;
    aniStep = 0;
    aniPercentage = 0;
    aniStates = [];
    camera(0, 0, 350, 0, 0, 0, 0, 1, 0);
}

function selectPlayerEvent() {
    console.log('selectPlayerEvent');
    setPlayer(0, selX.value());
    setPlayer(1, selO.value());
    console.log(players);
}

function setPlayer(playerNr, playerType) {
    if (playerType == 'Human') {
        players[playerNr] = new HumanPlayer();
    } else if (playerType == 'Random') {
        players[playerNr] = new RandomPlayer();
    } else {
        console.error('Invalid playerType ' + playerType)
    }
}