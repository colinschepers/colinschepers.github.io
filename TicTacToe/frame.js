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