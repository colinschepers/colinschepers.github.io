var textItems = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

function drawMenu() {
    if (!textItems[0][0]) {
        fillTextItems();
    }

    if (menuEnabled) {
        for (var y = 0; y < 3; y++) {
            for (var x = 0; x < 3; x++) {
                this.drawMenuItem(x, y);
            }
        }
    }
}

function drawMenuItem(x, y, txt) {
    push();
    translate(-gridSizeX + gridSizeX * x, -gridSizeY + gridSizeY * y, thickness);
    ambientLight(150);
    directionalLight(255, 255, 255, 0, 0, 1);
    texture(textItems[x][y]);
    plane(gridSizeX * 0.9, gridSizeY * 0.9);
    pop();
}

function fillTextItems() {
    const players = ['Human', 'Random', 'MiniMax'];
    for (var y = 0; y < 3; y++) {
        for (var x = 0; x < 3; x++) {
            textItems[x][y] = createGraphics(width, height);
            textItems[x][y].textAlign(CENTER);
            textItems[x][y].textSize(64);
            textItems[x][y].background(0, 0, 0, 0);
            textItems[x][y].fill(200);
            textItems[x][y].text(players[x] + '\nvs.\n' + players[y], width / 2, height / 3);
        }
    }
}