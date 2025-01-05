let enemy_4 = [];

function create_enemy_4(x, y, vel_x, vel_y) {
    this.position = new p5.Vector(x, y);
    this.vel_x = vel_x;
    this.vel_y = vel_y;
    this.radius = 2;
    this.segments = [new p5.Vector(x, y), new p5.Vector(0, 0), new p5.Vector(0, 0), new p5.Vector(0, 0), new p5.Vector(0, 0), new p5.Vector(0, 0), new p5.Vector(0, 0), new p5.Vector(0, 0), new p5.Vector(0, 0), new p5.Vector(0, 0), new p5.Vector(0, 0)];
    this.segmentRadius = 4;
    this.segLength = 4;
}

function enemy_4Movements(e_4) {
    enemy_4[e_4].position.x += enemy_4[e_4].vel_x;
    enemy_4[e_4].position.y += enemy_4[e_4].vel_y;

    if (enemy_4[e_4].position.y < resolutionY - enemy_4[e_4].radius - 20) {
        enemy_4[e_4].vel_y += 0.1;
    } else {
        enemy_4[e_4].position.y = resolutionY - enemy_4[e_4].radius - 20;
        if (randomInt(0, 50) == 0) {
            enemy_4[e_4].vel_y = randomInt(-1, -5);
            enemy_4[e_4].vel_x = randomInt(-2, 2);
        } else {
            enemy_4[e_4].vel_y = 0;
            enemy_4[e_4].vel_x = 0;
        }
        
        if (randomInt(0, 10) == 0) {
            
        } else {
            
        }
    }
}

