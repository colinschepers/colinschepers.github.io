function setup() {
  createCanvas(400, 400);
  background(100);
}

function draw() {

  noStroke();

  if (mouseIsPressed) {
    fill(255, 0, 0);
  } else {
    fill(100);
  }

  ellipseMode(CENTER);
  ellipse(mouseX, mouseY, 50, 50);
}