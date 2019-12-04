const starCount = 50;
const starRadiusMin = 3;
const starRadiusMax = 10;
const starMovement = 0.1;
const starFlickering = 3;

var stars = null;

class Star {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.radius = random(starRadiusMin, starRadiusMax);
        this.color = {
            r: 255,
            g: 255,
            b: random(150, 255),
            a: random(0, 255)
        }
    }

    draw() {
        this.x = max(-width, min(width, this.x + random(-starMovement, starMovement)));
        this.y = max(-height, min(height, this.y + random(-starMovement, starMovement)));
        this.z = max(-width, min(width, this.z + random(-starMovement, starMovement)));
        this.color.a = max(1, min(255, this.color.a + random(-starFlickering, starFlickering)));

        translate(this.x, this.y, this.z);

        for (let t = 2; t <= 5; t++) {
            beginShape();

            let a = this.color.a * (1 - t / 10);
            fill(this.color.r, this.color.g, this.color.b, a);

            for (let a = 0; a < TWO_PI; a += TWO_PI / 4) {
                let sx = this.x + cos(a) * this.radius;
                let sy = this.y + sin(a) * this.radius;
                vertex(sx, sy, this.z);
                sx = this.x + cos(a + TWO_PI / 8) * this.radius / t;
                sy = this.y + sin(a + TWO_PI / 8) * this.radius / t;
                vertex(sx, sy, this.z);
            }

            endShape();
        }

        translate(-this.x, -this.y, -this.z);
    }
}

function createStars() {
    let stars = [];
    for (let i = 0; i < starCount; i++) {
        let x = random(-width, width);
        let y = random(-height, height);
        stars.push(new Star(x, y, -width));
    }
    return stars;
}

function drawStars() {
    if (!stars) {
        stars = createStars();
    }
    for (let s of stars) {
        s.draw();
    }
}