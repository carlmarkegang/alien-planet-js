let enemy_1 = [];

function create_enemy_1(x, y, vel_x, vel_y) {
    this.position = new p5.Vector(x, y);
    this.vel_x = vel_x;
    this.vel_y = vel_y;
    this.radius = 10;
    this.segments = [new p5.Vector(x, y), new p5.Vector(0, 0), new p5.Vector(0, 0), new p5.Vector(0, 0), new p5.Vector(0, 0), new p5.Vector(0, 0), new p5.Vector(0, 0), new p5.Vector(0, 0), new p5.Vector(0, 0), new p5.Vector(0, 0), new p5.Vector(0, 0)];
    this.segmentRadius = 2;
    this.segLength = 4;
}

function enemy_1Movements(e_1) {
    enemy_1[e_1].position.x += enemy_1[e_1].vel_x;
    enemy_1[e_1].position.y += enemy_1[e_1].vel_y;
}

function enemy_1DragSegment(i, xin, yin, being) {
    var dx = xin - being.segments[i].x + (i* being.vel_x);
    var dy = yin - being.segments[i].y;
    var angle = atan2(dy, dx);
    being.segments[i].x = xin - cos(angle) * being.segLength;
    being.segments[i].y = yin - sin(angle) * being.segLength;

    // draw
    push();
    strokeWeight(being.segmentRadius * 2);
    stroke(color(80, 80, 80));
    translate(being.segments[i].x, being.segments[i].y);
    rotate(angle);
    line(0, 0, being.segLength, 0);
    pop();
}

