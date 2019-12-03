class WinningAnimation {
    constructor(winningLine, gridSizeX, gridSizeY) {
        this.animationEnded = false;
        this.aniRotation = 0;
        this.aniStep = 0;
        this.aniPercentage = 0;
        this.aniStates = [];
        this.aniCenter = [];
        this.winningLine = winningLine;
        this.gridSizeX = gridSizeX;
        this.gridSizeY = gridSizeY;
        this.__calculateAnimation(winningLine, gridSizeX, gridSizeY);
    }

    animate() {
        if (this.animationEnded) {
            return;
        }

        if (state.score == 0.5) {
            this.aniRotation += 0.02;
            rotateZ(this.aniRotation);
            return;
        }

        if (this.aniStates.length > 0) {
            this.aniPercentage += 0.01;

            let startX = this.aniStates[this.aniStep][0];
            let startY = this.aniStates[this.aniStep][1];
            let startZ = this.aniStates[this.aniStep][2];
            let endX = this.aniStates[(this.aniStep + 1) % this.aniStates.length][0];
            let endY = this.aniStates[(this.aniStep + 1) % this.aniStates.length][1];
            let endZ = this.aniStates[(this.aniStep + 1) % this.aniStates.length][2];
            let x = startX + this.aniPercentage * (endX - startX);
            let y = startY + this.aniPercentage * (endY - startY);
            let z = startZ + this.aniPercentage * (endZ - startZ);

            camera(x, y, z, this.aniCenter[0], this.aniCenter[1], this.aniCenter[2], 0, 1, 0);

            if (this.aniPercentage >= 1.0) {
                this.aniPercentage = 0;
                this.aniStep++;

                if (this.aniStep == this.aniStates.length) {
                    this.aniStep %= this.aniStates.length;
                    //this.animationEnded = true;
                }
            }
        }
    }

    __calculateAnimation() {
        const moveDistance = 4;

        for (var i = 0; i < 3; i++) {
            if (this.winningLine[0][i] && this.winningLine[1][i] && this.winningLine[2][i]) {
                let y = -this.gridSizeY + this.gridSizeY * i
                this.aniStates = [
                    [0, 0, 350],
                    [this.gridSizeX * moveDistance, 0, 0],
                    [0, 0, -350],
                    [-this.gridSizeX * moveDistance, 0, 0]
                ];
                this.aniCenter = [0, y, 0]
                return;
            } else if (this.winningLine[i][0] && this.winningLine[i][1] && this.winningLine[i][2]) {
                let x = -this.gridSizeX + this.gridSizeX * i
                this.aniStates = [
                    [0, 0, 350],
                    [0, -this.gridSizeY * moveDistance, 0],
                    [0, 0, -350],
                    [0, this.gridSizeY * moveDistance, 0]
                ];
                this.aniCenter = [x, 0, 0]
                return;
            }
        }
        if (this.winningLine[0][0] && this.winningLine[1][1] && this.winningLine[2][2]) {
            let x = -this.gridSizeX + this.gridSizeX * i
            this.aniStates = [
                [0, 0, 350],
                [-this.gridSizeY * moveDistance, -this.gridSizeY * moveDistance, 0],
                [0, 0, -350],
                [this.gridSizeY * moveDistance, this.gridSizeY * moveDistance, 0]
            ];
            this.aniCenter = [0, 0, 0]
            return;
        } else if (this.winningLine[0][2] && this.winningLine[1][1] && this.winningLine[2][0]) {
            let x = -this.gridSizeX + this.gridSizeX * i
            this.aniStates = [
                [0, 0, 350],
                [this.gridSizeY * moveDistance, -this.gridSizeY * moveDistance, 0],
                [0, 0, -350],
                [-this.gridSizeY * moveDistance, this.gridSizeY * moveDistance, 0]
            ];
            this.aniCenter = [0, 0, 0]
            return;
        }
    }
}