let enemy_3 = [];

function create_enemy_3(x, y, vel_x, vel_y) {
    this.position = new p5.Vector(x, y);
    this.vel_x = vel_x;
    this.vel_y = vel_y;
    this.radius = 1;
    this.segments = [new p5.Vector(x, y), new p5.Vector(0, randomInt(-200, 0)), new p5.Vector(0, randomInt(-200, 0)), new p5.Vector(0, randomInt(-200, 0)), new p5.Vector(0, randomInt(-200, 0)), new p5.Vector(0, 0), new p5.Vector(0, randomInt(-200, 0)), new p5.Vector(0, randomInt(-200, 0)), new p5.Vector(0, randomInt(-200, 0)), new p5.Vector(0, randomInt(-200, 0)), new p5.Vector(0, randomInt(-200, 0))];
    this.segmentRadius = 2;
    this.segLength = randomInt(3, 6);
}




function enemy_3Movements(e_3) {
    enemy_3[e_3].position.x += enemy_3[e_3].vel_x;
    enemy_3[e_3].position.y += enemy_3[e_3].vel_y;
}

function enemy_3DragSegment(i, xin, yin, being, colorarray) {
    var dx = xin - being.segments[i].x;
    var dy = yin - being.segments[i].y;
    var angle = atan2(dy, dx);
    being.segments[i].x = xin - cos(angle) * being.segLength;
    being.segments[i].y = yin - sin(angle) * being.segLength;

    push();
    strokeWeight(being.segmentRadius * 2);
    stroke(color(colorarray[0], colorarray[1], colorarray[2]));
    // Shadow
    if (colorarray[0] == 0) {
        translate(being.segments[i].x + 2, being.segments[i].y + 2);
    } else {
        translate(being.segments[i].x, being.segments[i].y);
    }

    rotate(angle);
    line(0, 0, being.segLength, 0);
    pop();
}