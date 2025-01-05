let enemy_2 = [];

function create_enemy_2(x, y, vel_x, vel_y) {
    this.position = new p5.Vector(x, y);
    this.vel_x = vel_x;
    this.vel_y = vel_y;
    this.radius = 5;
    this.segments = [new p5.Vector(x, y), new p5.Vector(0, 0), new p5.Vector(0, 0), new p5.Vector(0, 0), new p5.Vector(0, 0), new p5.Vector(0, 0), new p5.Vector(0, 0), new p5.Vector(0, 0), new p5.Vector(0, 0), new p5.Vector(0, 0), new p5.Vector(0, 0)];
    this.segmentRadius = 4;
    this.segLength = 4;
}



function enemy_2Movements(e_2) {
    enemy_2[e_2].position.x += enemy_2[e_2].vel_x;
    enemy_2[e_2].position.y += enemy_2[e_2].vel_y;

    if (randomInt(1, 10) == 1) {
        enemy_2[e_2].vel_x = randomInt(-2, 2) / 10;
        enemy_2[e_2].vel_y = randomInt(-2, 2) / 10;
    }

    if (enemy_2[e_2].position.x > resolutionX) {
        enemy_2[e_2].vel_x = -1;
    }
    if (enemy_2[e_2].position.x < 0) {
        enemy_2[e_2].vel_x = 1;
    }

    if (enemy_2[e_2].position.y > resolutionY - 50) {
        enemy_2[e_2].vel_y = -1;
    }
    if (enemy_2[e_2].position.y < 0) {
        enemy_2[e_2].vel_y = 1;
    }
}