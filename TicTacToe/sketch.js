const width = 400;
const height = 400;
const thickness = 10;
const gridSizeX = (width - 2 * thickness) / 3;
const gridSizeY = (height - 2 * thickness) / 3;
const rotationSpeed = 0.15;

var players = [null, null];
var state = null;
var awaitingMove = false;
var rotation = Infinity;
var menuEnabled = true;

function setup() {
    createCanvas(width, height, WEBGL);
    //debugMode(600, 50, 0, 300, 0, 600, -300, -300, 0);
}

function draw() {
    //frameRate(30);
    noStroke();
    background(55);
    createLight();
    checkState();
    drawFrame();
    drawSymbols();
    drawMenu();
    orbitControl();
}

function newGame() {
    state = new State();
    awaitingMove = false;
    rotation = 0;
    menuEnabled = false;
    camera(0, 0, 340, 0, 0, 0, 0, 1, 0);
}

function createLight() {
    let v = createVector(mouseX - width / 2, mouseY - width / 2, 0);
    v.normalize();
    directionalLight(255, 255, 255, v);
}

function checkState() {
    if (state && !state.isGameOver) {
        if (!awaitingMove) {
            move();
        }
    } else {
        gameOver();
    }
}

function move() {
    awaitingMove = true;

    var roundNr = state.roundNr;
    var playerToMove = players[state.getPlayerToMove()];

    if (playerToMove && playerToMove.constructor.name !== 'HumanPlayer') {
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

function gameOver() {
    rotation = rotation + rotationSpeed;
    if (rotation < 4 * PI) {
        if (state.score == 0.5) {
            rotateZ(rotation);
        } else if (state.score == 0) {
            rotateX(rotation);
        } else if (state.score == 1) {
            rotateY(rotation);
        }
    } else {
        menuEnabled = true;
    }
}

function mouseReleased() {
    if (state && !state.isGameOver) {
        var playerToMove = players[state.getPlayerToMove()];
        if (playerToMove.constructor.name === 'HumanPlayer') {
            let x = Math.floor(mouseX / (width / 3));
            let y = Math.floor(mouseY / (height / 3));
            let move = y * 3 + x;
            if (x >= 0 && x < 3 && y >= 0 && y < 3 && state.isValid(move)) {
                state.play(move);
                awaitingMove = false;
            }
        }
    } else {
        let x = Math.floor(mouseX / (width / 3));
        let y = Math.floor(mouseY / (height / 3));
        if (x >= 0 && x < 3 && y >= 0 && y < 3) {
            if (x == 0) {
                players[0] = new HumanPlayer()
            } else if (x == 1) {
                players[0] = new RandomPlayer()
            } else if (x == 2) {
                players[0] = new MiniMaxPlayer()
            }
            if (y == 0) {
                players[1] = new HumanPlayer()
            } else if (y == 1) {
                players[1] = new RandomPlayer()
            } else if (y == 2) {
                players[1] = new MiniMaxPlayer()
            }
            newGame();
        }
    }
}